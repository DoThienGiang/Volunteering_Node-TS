import mongoose from "mongoose";
import IThamGia from "../interface/thamgia.interface";

const thamgiaSchema = new mongoose.Schema(
    {
        thanhVien: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ThanhVien"
            }
        ],
        hoatDong: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "HoatDong"
            }
        ],
        NgayGioDangKy: {
            type: Date,
            max: new Date(),
            required: true,
        },
        DiemTruongDoan: {
            type: Number,
            required: true,
        },
        DiemTieuChi1: {
            type: Number,
            required: true,
        },
        DiemTieuChi2: {
            type: Number,
            required: true,
        },
        DiemTieuChi3: {
            type: Number,
            required: true,
        },
        NhanXetKhac: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);


const ThamGia = mongoose.model<IThamGia>("ThamGia", thamgiaSchema);

export default ThamGia;