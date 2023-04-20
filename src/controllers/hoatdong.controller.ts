import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import ApiError from "../utils/AppError";
import { Document } from "mongoose";
import { Request, Response } from "express";
import HoatDong from "../models/hoatdong.model"
import ThanhVien from './../models/thanhvien.model';

class HoatDongController {
    public createHoatDong = catchAsync(async (req: Request, res: Response) => {
        const hoatdongs: Document = new HoatDong(req.body);
        await hoatdongs.save();
        res.status(httpStatus.CREATED).json({
            status: "Create Success",
            data: hoatdongs,
        });

    });

    public getAllHoatDong = catchAsync(async (req: Request, res: Response) => {
        const hoatdongs: Document[] = await HoatDong.find().populate('thanhVien');
        res.status(httpStatus.CREATED).json(hoatdongs);
    });

    public getOneHoatDong = catchAsync(async (req: Request, res: Response) => {
        const hoatdongs: Document | null = await HoatDong.findById(req.params.hoatDongId).populate('thanhVien');
        if (!hoatdongs) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Hoat Dong not found');
        }
        res.status(httpStatus.CREATED).json(hoatdongs);
    });

    public updateHoatDong = catchAsync(async (req: Request, res: Response) => {
        const hoatdongs = await HoatDong.findByIdAndUpdate(
            req.params.hoatDongId,
            req.body,
            { new: true, }
        ).populate('thanhVien')
        if (!hoatdongs) {
            throw new ApiError(httpStatus.NOT_FOUND, "Hoat Dong not found");
        }
        res.status(200).json({
            status: "Update Success",
            data: hoatdongs,
        });
    });

    public deleteHoatDong = catchAsync(async (req: Request, res: Response) => {
        const hoatdongs = await HoatDong.findByIdAndDelete(req.params.hoatDongId);
        if (!hoatdongs) {
            throw new ApiError(httpStatus.NOT_FOUND, "Hoat Dong not found");
        }
        res.status(200).json({
            status: "Delete Success",
            // trả về database bạn muốn xóa
            data: hoatdongs,
        });
    });

}
export default HoatDongController