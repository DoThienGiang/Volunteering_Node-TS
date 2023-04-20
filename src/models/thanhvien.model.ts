import mongoose from "mongoose";
import IThanhVien from "../interface/thanhvien.interface";

const thanhvienSchema = new mongoose.Schema(
    {
        HoTen: {
            type: String,
            trim: true,
            required: true,
        },
        GioiTinh: {
            type: Boolean,
            trim: true,
            required: true,
        },
        NgaySinh: {
            type: Date,
            max: new Date(),
            required: true,
        },
        DiaChiEmail: {
            type: String,
            required: true,
        },
        SoDienThoai: {
            type: String,
            required: true,
        },
        isTruongDoan: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);


const ThanhVien = mongoose.model<IThanhVien>("ThanhVien", thanhvienSchema);

export default ThanhVien;