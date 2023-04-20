import express from "express";
import IRoutes from "../../interface/router.interface";
import thanhVienController from "../../controllers/thanhvien.controller";
import {
    getOneThanhVien,
    updateThanhVien,
    deleteThanhVien,
    getAllThanhVien,
    createThanhVien,
} from "../../validations/thanhvien.validation";
import validate from "../../middlewares/validate.middleware";

// const router = express.Router();
class ThanhVienRoute implements IRoutes {
    public path = "/thanhviens";
    public router = express.Router();
    private thanhVienController = new thanhVienController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router
            .route(`${this.path}/:thanhVienId`)
            .get(validate(getOneThanhVien), this.thanhVienController.getOneThanhVien)
            .patch(validate(updateThanhVien), this.thanhVienController.updateThanhVien)
            .delete(validate(deleteThanhVien), this.thanhVienController.deleteThanhVien);

        this.router
            .route(`${this.path}/`)
            .get(validate(getAllThanhVien), this.thanhVienController.getAllThanhVien)
            .post(validate(createThanhVien), this.thanhVienController.createThanhVien);
    }
}

export default ThanhVienRoute;