import { Document } from "mongoose";
import mongoose from "mongoose";

export default interface ThanhVien extends Document {
    thanhviens: mongoose.Schema.Types.ObjectId,
    hoatdongs: mongoose.Schema.Types.ObjectId,
    NgayGioDangKy: Date;
    DiemTruongDoan: number;
    DiemTieuChi1: number;
    DiemTieuChi2: number;
    DiemTieuChi3: number;
    NhanXetKhac: string;
}