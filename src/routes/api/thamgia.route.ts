import express from "express";
import IRoutes from "../../interface/router.interface";
import thamGiaController from "../../controllers/thamgia.controller";
import {
    getOneThamGia,
    updateThamGia,
    deleteThamGia,
    getAllThamGia,
    createThamGia,
} from "../../validations/thamgia.validation";
import validate from "../../middlewares/validate.middleware";

// const router = express.Router();
class ThamGiaRoute implements IRoutes {
    public path = "/thamgias";
    public router = express.Router();
    private thamGiaController = new thamGiaController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        

        this.router
            .route(`${this.path}/`)
            .get(validate(getAllThamGia), this.thamGiaController.getAllThamGia)
            .post(validate(createThamGia), this.thamGiaController.createThamGia);
        
        this.router
            .route(`${this.path}/sort`)
            .get(this.thamGiaController.sortAverageScore)    
            
        this.router
            .route(`${this.path}/:thamGiaId`)
            .get(validate(getOneThamGia), this.thamGiaController.getOneThamGia)
            .patch(validate(updateThamGia), this.thamGiaController.updateThamGia)
            .delete(validate(deleteThamGia), this.thamGiaController.deleteThamGia);
    }
}

export default ThamGiaRoute; 