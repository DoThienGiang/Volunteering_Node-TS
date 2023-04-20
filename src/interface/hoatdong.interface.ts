import { Document } from "mongoose";
import mongoose from "mongoose";

export default interface ThanhVien extends Document {
    thanhviens: mongoose.Schema.Types.ObjectId,
    MotaHD: string;
    NgayGioBD: Date;
    NgayGioKT: Date;
    SLToiThieuYC: number;
    SLToiDaYC: number;
    TrangThai: Boolean;
    LyDoHuyHD: string;
}