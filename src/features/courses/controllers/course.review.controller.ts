import { Router, Request } from "express";
import { authenticate } from "../../../core/middlewares/authenticate.middleware.js";
import { CourseReview } from "../entities/course-review.entity.js";
import {plainToInstance } from "class-transformer";
import { CourseReviewList } from "../dtos/course-review/course-review.list.js";
import { validateDto } from "../../../core/middlewares/validate-body.middleware.js";
import { CourseReviewCreate } from "../dtos/course-review/course-review.create.js";

declare global {
    namespace Express {
        interface Request {
            user: { id: number };
        }
    }
}
export const courseReviewRouter = Router();

/**
 * @swagger
 * /course-reviews:
 *   post:
 *     summary: Create a new course review
 *     description: Creates a review for a course. Requires authentication.
 *     tags:
 *       - CourseReviews
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - rating
 *               - userId
 *             properties:
 *               userId: 
 *                 type: integer
 *               courseId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Review successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 userId:
 *                   type: number
 *                 courseId:
 *                   type: number
 *                 rating:
 *                   type: number
 *                 comment:
 *                   type: string
 *                   nullable: true
 */
courseReviewRouter.post(
    "/course-reviews",
    validateDto(CourseReviewCreate), 
    authenticate(),
    async (req, res) => {
    let newReview: CourseReview = CourseReview.create({
        ...req.body,
        userId: req.user.id
    })
    // @ts-ignore
    await  CourseReview.save(newReview);
    return res.status(201).json(newReview)
})


/**
 * @swagger
 * /course-reviews:
 *   get:
 *     summary: Get all course reviews
 *     description: Retrieves a list of course reviews with user and course relations
 *     tags:
 *       - CourseReviews
 *     responses:
 *       200:
 *         description: Successfully retrieved all reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   user:
 *                     type: object
 *                   course:
 *                     type: object
 *                   rating:
 *                     type: number
 *                   comment:
 *                     type: string
 *                     nullable: true
 */
courseReviewRouter.get("/course-reviews", async (req, res) => {
    let reviews = await CourseReview.find({relations: ['user', 'course']});
    let data = plainToInstance(CourseReviewList, reviews, {excludeExtraneousValues: true});
    return res.status(200).json(data);
})


/**
 * @swagger
 * /course-reviews/{id}:
 *   delete:
 *     summary: Delete a course review
 *     description: Deletes a course review by its ID
 *     tags:
 *       - CourseReviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The review ID
 *     responses:
 *       204:
 *         description: Review successfully deleted
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
courseReviewRouter.delete("/course-reviews/:id", authenticate(), async (req, res) => {
    let id = Number(req.params.id);
    let review = await CourseReview.findOneBy({ id: id });
    if (review) {
        await CourseReview.remove(review);
        return res.status(204).send();
    } else {
        return res.status(404).json({ message: "Review with given id not found" });
    }
})


/**
 * @swagger
 * /course-reviews/{id}:
 *   patch:
 *     summary: Partially update a course review
 *     description: Updates specific fields of a course review. Only non-null values are updated
 *     tags:
 *       - CourseReviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Review successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 rating:
 *                   type: integer
 *                 comment:
 *                   type: string
 *                   nullable: true
 *                 updatedAt:
 *                   type: string
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
courseReviewRouter.patch("/course-reviews/:id", authenticate(), async (req, res) => {
    let id = Number(req.params.id);
    let review = await CourseReview.findOneBy({ id: id });
    if (review) {
        Object.assign(
            review,
            Object.fromEntries(Object.entries(req.body).filter(([key, value]) => value !== null))
        );
        await CourseReview.save(review);
        return res.status(200).json(review);
    } else {
        return res.status(404).json({ message: "Review with given id not found" });
    }
})
