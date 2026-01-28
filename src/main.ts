import "dotenv/config";
import "reflect-metadata";
import {AppDataSource} from "./core/data-source.js";
import express from "express";
import {setupSwagger} from "./core/swagger.js";
import {user} from "./features/authentication/controllers/user.controller.js";


await AppDataSource.initialize();

const app = express();

app.use(express.json());
app.use(user);

setupSwagger(app);
app.listen(8000, "0.0.0.0", () => console.log("Server is up and running..."));
