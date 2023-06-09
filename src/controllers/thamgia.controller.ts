import { Request, Response } from "express";
import HoatDong from "../models/hoatdong.model";
import ThanhVien from "../models/thanhvien.model";
import ThamGia from "../models/thamgia.model";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import ApiError from "../utils/AppError";
import pick from "../utils/pick";
import { Document } from "mongoose";

class ThamGiaController {
    public createThamGia = catchAsync(
        async (req: Request, res: Response): Promise<Response | void> => {
            const thamGia = await ThamGia.create(req.body);
            if (req.body.hoatDong?.length) {
                req.body.hoatDong.forEach(async (el: any) => {
                    const _hoatDong = await HoatDong.findByIdAndUpdate(
                        el,
                        {
                            $push: { thamGias: thamGia.id },
                        },
                        { new: true }
                    );
                    if (!_hoatDong) throw new ApiError(httpStatus.NOT_FOUND, "HoatDong not found");
                });
            }
            if (req.body.thanhViens?.length) {
                req.body.thanhViens.forEach(async (el: any) => {
                    const thanhVien = await ThanhVien.findByIdAndUpdate(
                        el,
                        {
                            $push: { thamGias: thamGia.id },
                        },
                        { new: true }
                    );
                    if (!thanhVien) throw new ApiError(httpStatus.NOT_FOUND, "ThanhVien not found");
                });
            }
            return res.status(201).json(thamGia);
        });

    public getAllThamGia = catchAsync(
        async (req: Request, res: Response): Promise<Response | void> => {
            const filter = pick(req.query, ["name", "age"]);
            const options = pick(req.query, ["sortBy", "limit", "page"]);
            const thamGias = await ThamGia.find(filter, options).populate('thanhVien', 'hoatDong');
            return res.status(200).json(thamGias);
        });

    public getOneThamGia = catchAsync(
        async (req: Request, res: Response): Promise<Response | void> => {
            const thamGia = await ThamGia.findById(req.params.thamGiaId);
            if (!thamGia) {
                throw new ApiError(httpStatus.NOT_FOUND, "ThamGia not found");
            }
            return res.status(200).json(thamGia);
        });

    public updateThamGia = catchAsync(
        async (req: Request, res: Response): Promise<Response | void> => {
            const thamGia = await ThamGia.findByIdAndUpdate(
                req.params.thamGiaId,
                req.body,
                {
                    new: true,
                }
            );
            if (!thamGia) {
                throw new ApiError(httpStatus.NOT_FOUND, "ThamGia not found");
            }
            return res.status(200).json({
                message: "Delete Success",
                // trả về database bạn muốn xóa
                data: thamGia,
            });
        }
    )
    public deleteThamGia = catchAsync(
        async (req: Request, res: Response): Promise<Response | void> => {
            const thamgia = await ThamGia.findByIdAndDelete(req.params.thamGiaId);
            if (!thamgia) {
                throw new ApiError(httpStatus.NOT_FOUND, "ThamGia not found");
            } else {
                if (req.body.hoatDong && req.body.hoatDongs.length) {
                    await Promise.all(
                        req.body.hoatDong.map(async (el: any) => {
                            const _hoatDong = await HoatDong.findByIdAndUpdate(
                                el,
                                {
                                    $pull: { thamGias: thamgia.id },
                                },
                                { new: true }
                            );
                            if (!_hoatDong) {
                                throw new ApiError(httpStatus.NOT_FOUND, "HoatDong not found");
                            }
                        })
                    );
                }
                if (req.body.thanhVien && req.body.thanhViens.length) {
                    req.body.thanhViens.forEach(async (el: any) => {
                        const thanhVien = await ThanhVien.findByIdAndUpdate(el, {
                            $pull: { thamGias: thamgia.id },

                        },
                            { new: true }
                        );
                        if (!thanhVien)
                            throw new ApiError(httpStatus.NOT_FOUND, "ThanhVien not found");
                    });
                }
            }
            return res.status(200).json({
                message: "Delete Success",
                // trả về database bạn muốn xóa
                data: thamgia,
            });
        }
    );


    public sortAverageScore = catchAsync(
        async (req: Request, res: Response): Promise<Response | void> => {
            const results = await ThamGia.aggregate([

                {$lookup: {
                    from: 'thanhviens',
                    localField: 'thanhVien',
                    foreignField: '_id',
                    as: 'ThanhVien',
                },},
                {$replaceRoot: {
                    newRoot: { $mergeObjects: [{ $arrayElemAt: ['$ThanhVien', 0] }, '$$ROOT'] },
                },},
                {
                    $project: {
                        ThanhVien: 0
                    }
                },
                {$match: {"isTruongDoan": true}},
                {$lookup: {
                    from: 'hoatdongs',
                    localField: 'hoatDong',
                    foreignField: '_id',
                    as: 'HoatDong',
                },},
                {$replaceRoot: {
                    newRoot: { $mergeObjects: [{ $arrayElemAt: ['$HoatDong', 0] }, '$$ROOT'] },
                },},
                {
                    $project: {
                        HoatDong: 0
                    }
                },
                {$group: {
                    _id: "$thanhVien",
                    diemTBTruongDoan: {
                        $avg: {
                            $sum: ["$DiemTruongDoan"]
                        }
                    },
                    diemTrungBinhTC: {
                        $avg: {
                            $sum: ["$DiemTieuChi1", "$DiemTieuChi2", "$DiemTieuChi3"]
                        }
                    },
                }},
                {$project: {
                    _id: "$_id",
                    mediumScore: {
                        $divide: [{ $add: ["$diemTBTruongDoan", "$diemTrungBinhTC"] }, 4]
                    }
                }},
                { $sort:{mediumScore:1}}
            ])
            return res.status(200).json(results)     
        }
    )

}
export default ThamGiaController