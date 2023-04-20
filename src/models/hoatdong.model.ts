import mongoose from "mongoose";
import ITHoatDong from "../interface/hoatdong.interface";

const hoatdongSchema = new mongoose.Schema(
    {
        thanhVien: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ThanhVien"
        }],
        MotaHD: {
            type: String,
            trim: true,
            required: true,
        },
        NgayGioBD: {
            type: Date,
            max: new Date(),
            required: true,
        },
        NgayGioKT: {
            type: Date,
            max: new Date(),
            required: true,
        },
        SLToiThieuYC: {
            type: Number,
            required: true,
        },
        SLToiDaYC: {
            type: Number,
            required: true,
        },
        ThoiHanDK: {
            type: String,
            required: true,
        },
        TrangThai: {
            type: Boolean,
            required: true,
        },
        LyDoHuyHD: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);


const HoatDong = mongoose.model<ITHoatDong>("HoatDong", hoatdongSchema);

export default HoatDong;