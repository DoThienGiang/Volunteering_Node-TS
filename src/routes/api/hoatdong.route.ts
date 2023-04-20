import express from "express";
import IRoutes from "../../interface/router.interface";
import hoatDongController from "../../controllers/hoatdong.controller";
import {
    getOneHoatDong,
    updateHoatDong,
    deleteHoatDong,
    getAllHoatDong,
    createHoatDong,
} from "../../validations/hoatdong.validation";
import validate from "../../middlewares/validate.middleware";

// const router = express.Router();
class HoatDongRoute implements IRoutes {
    public path = "/hoatdongs";
    public router = express.Router();
    private hoatDongController = new hoatDongController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router
            .route(`${this.path}/:hoatDongId`)
            .get(validate(getOneHoatDong), this.hoatDongController.getOneHoatDong)
            .patch(validate(updateHoatDong), this.hoatDongController.updateHoatDong)
            .delete(validate(deleteHoatDong), this.hoatDongController.deleteHoatDong);

        this.router
            .route(`${this.path}/`)
            .get(validate(getAllHoatDong), this.hoatDongController.getAllHoatDong)
            .post(validate(createHoatDong), this.hoatDongController.createHoatDong);
    }
}

export default HoatDongRoute;