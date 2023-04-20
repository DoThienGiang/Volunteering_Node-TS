import Joi from "joi";
import { objectId } from "./custom.validation";

const createHoatDong = {
    body: Joi.object().keys({
        MotaHD: Joi.string().required(),
        NgayGioBD: Joi.date().required(),
        NgayGioKT: Joi.date().required(),
        SLToiThieuYC: Joi.number().required(),
        SLToiDaYC: Joi.number().required(),
        ThoiHanDK: Joi.string().required(),
        TrangThai: Joi.boolean().required(),
        LyDoHuyHD: Joi.string().required(),
        thanhVien: Joi.array().items(Joi.string().custom(objectId)),
    }),
};

const getAllHoatDong = {
    query: Joi.object().keys({
        MotaHD: Joi.string().optional(),
        NgayGioBD: Joi.date().optional(),
        NgayGioKT: Joi.date().optional(),
        SLToiThieuYC: Joi.number().optional(),
        SLToiDaYC: Joi.number().optional(),
        ThoiHanDK: Joi.string().optional(),
        TrangThai: Joi.boolean().optional(),
        LyDoHuyHD: Joi.string().optional(),
    }),
};

const getOneHoatDong = {
    params: Joi.object().keys({
        hoatDongId: Joi.string().custom(objectId),
    }),
};

const updateHoatDong = {
    params: Joi.object().keys({
        hoatDongId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        MotaHD: Joi.string().optional(),
        NgayGioBD: Joi.date().optional(),
        NgayGioKT: Joi.date().optional(),
        SLToiThieuYC: Joi.number().optional(),
        SLToiDaYC: Joi.number().optional(),
        ThoiHanDK: Joi.date().optional(),
        TrangThai: Joi.boolean().optional(),
        LyDoHuyHD: Joi.string().optional(),
        thanhVien: Joi.array().items(Joi.string().custom(objectId)),
    }),
};

const deleteHoatDong = {
    params: Joi.object().keys({
        hoatDongId: Joi.string().custom(objectId),
    }),
};

export {
    createHoatDong,
    getAllHoatDong,
    getOneHoatDong,
    updateHoatDong,
    deleteHoatDong
};