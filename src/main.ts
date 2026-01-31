import "dotenv/config";
import "reflect-metadata";
import {AppDataSource} from "./core/data-source.js";
import express from "express";
import {setupSwagger} from "./core/swagger.js";
import {user} from "./features/authentication/controllers/user.controller.js";
import { authorRouter } from "./features/courses/controllers/author.controller.js";
import { courseRouter } from "./features/courses/controllers/course.controller.js";
import { categoryRouter } from "./features/courses/controllers/category.controller.js";
import { levelRouter } from "./features/courses/controllers/level.controller.js";
import { sectionRouter } from "./features/courses/controllers/section.controller.js";
import { languageRouter } from "./features/courses/controllers/languages.controller.js";
import { uploadsRouter } from "./features/uploads/uploads.controller.js";
import { courseReviewRouter } from "./features/courses/controllers/course.review.controller.js";
import { bookReviewRouter } from "./features/library/controllers/book-review.controller.js";
import { bookRouter } from "./features/library/controllers/book.controller.js";


await AppDataSource.initialize();

const app = express();

app.use(express.json());
app.use("/", uploadsRouter)
app.use("/", user);
app.use("/", authorRouter);
app.use("/", courseRouter);
app.use("/", categoryRouter)
app.use("/", levelRouter)
app.use("/", sectionRouter);
app.use("/", languageRouter)
app.use("/", courseReviewRouter)
app.use("/", bookReviewRouter)
app.use("/", bookRouter),



setupSwagger(app);
app.listen(8000, "0.0.0.0", () => console.log("Server is up and running..."));
