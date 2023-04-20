import { Request, Response } from "express";
import httpStatus from "http-status";
import ThanhVien from "../models/thanhvien.model";
import ApiError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import pick from "../utils/pick";
import { Document } from "mongoose";
import { json } from "express";

class ThanhVienController {
    public createThanhVien = catchAsync(
        async (req: Request, res: Response): Promise<Response | void> => {
            const thanhVien: Document = await ThanhVien.create(req.body);
            return res.status(httpStatus.CREATED).json({
                status: "Create Success",
                data: thanhVien,
            });
        }
    );

    public getAllThanhVien = catchAsync(
        async (req: Request, res: Response): Promise<Response | void> => {
            const filter = pick(req.query, ["name"]);
            const options = pick(req.query, ["sortBy", "limit", "page"]);
            const thanhviens = await ThanhVien.find(filter, options)
            return res.status(httpStatus.OK).json(thanhviens);
        }
    );

    public getOneThanhVien = catchAsync(
        async (req: Request, res: Response): Promise<Response | void> => {
            const thanhVien: Document | null = await ThanhVien.findById(req.params.thanhVienId);
            if (!thanhVien) {
                throw new ApiError(httpStatus.NOT_FOUND, "ThanhVien not found");
            }
            return res.status(httpStatus.OK).json({
                status: "success",
                data: thanhVien,
            });
        }
    );

    public updateThanhVien = catchAsync(
        async (req: Request, res: Response): Promise<Response | void> => {
            const thanhVien: Document | null = await ThanhVien.findByIdAndUpdate(
                req.params.thanhVienId,
                req.body,
                {
                    new: true,
                }
            );
            if (!thanhVien) {
                throw new ApiError(httpStatus.NOT_FOUND, "ThanhVien not found");
            }
            return res.status(httpStatus.OK).json({
                status: "Update Success",
                data: thanhVien,
            });
        }
    );

    public deleteThanhVien = catchAsync(
        async (req: Request, res: Response): Promise<Response | void> => {
            const thanhVien: Document | null = await ThanhVien.findByIdAndRemove(req.params.thanhVienId);
            if (!thanhVien) {
                throw new ApiError(httpStatus.NOT_FOUND, "ThanhVien not found");
            }
            return res.status(httpStatus.OK).json({
                status: "Delete Success",
            });
        }
    );
}
export default ThanhVienController;