import { Document } from "mongoose";

export default interface ThanhVien extends Document {
    HoTen: String;
    GioiTinh: Boolean;
    NgaySinh: Date;
    DiaChiEmail: String;
    SoDienThoai: String;
    isTruongDoan: Boolean;
}