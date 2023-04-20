import express, { Application } from "express";
import mongoose from "mongoose";
import { errorConverter, errorHandler } from "./middlewares/error.middleware";
import IRoutes from "./interface/router.interface";
import ApiError from "./utils/AppError";
import httpStatus from "http-status";

class App {
    public express: Application;
    public port: number;

    constructor(routes: IRoutes[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    private initializeMiddleware(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }

    private initializeRoutes(routes: IRoutes[]): void {
        routes.forEach((routes: IRoutes) => {
            this.express.use("/api", routes.router);
        });
    }

    private initializeErrorHandling(): void {
        this.express.use((req, res, next) => {
            next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
        });
        this.express.use(errorConverter);
        this.express.use(errorHandler);
    }

    private initializeDatabaseConnection(): void {
        mongoose
            .connect(process.env.MONGO_URL || "mongodb://0.0.0.0:27017/API_NodeJS-TypeScript_IziSoftWare")
            .then(res => {
                console.log("MongoDB Connected successfully.")
            })
            .catch(err => {
                console.log("MongoDB Connection failed")
                throw err
            })
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listenting on the port ${this.port}`);
        });
    }
}

export default App;