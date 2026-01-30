import {Router, Request, Response} from "express";
import {validateDto} from "../../../core/middlewares/validate-body.middleware.js";
import {BookReviewCreate} from "../dtos/book-review/book-review.create.js";
import {BookReview} from "../entities/book-review.entity.js";
import {plainToInstance} from "class-transformer";
import {BookReviewList} from "../dtos/book-review/book-review.list.js";
// import {User} from "../../authentication/entities/user.entity.js";
// import argon2 from "argon2";
import {authenticate} from "../../../core/middlewares/authenticate.middleware.js";

export const bookReviewRouter = Router();

/**
 * @swagger
 * /book-reviews:
 *   post:
 *     summary: Create a new book review
 *     description: Creates a new book review with rating and optional comment
 *     tags:
 *       - Book Reviews
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - rating
 *             properties:
 *               bookId:
 *                 type: number
 *                 description: ID of the book being reviewed
 *               rating:
 *                 type: number
 *                 description: Rating for the book
 *               comment:
 *                 type: string
 *                 description: Optional comment about the book (max 1024 characters)
 *                 maxLength: 1024
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Book review successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 userId:
 *                   type: number
 *                 bookId:
 *                   type: number
 *                 rating:
 *                   type: number
 *                 comment:
 *                   type: string
 *                   nullable: true
 *       400:
 *         description: Invalid request data or validation error
 */
bookReviewRouter.post(
    "/book-reviews",
    validateDto(BookReviewCreate),
    authenticate(),
    async (req: Request, res: Response) => {
        let newReview: BookReview = BookReview.create(req.body);

        // @ts-ignore
        newReview.userId = req.user.id;

        await BookReview.save(newReview);
        return res.status(201).json(newReview);
    })

/**
 * @swagger
 * /book-reviews:
 *   get:
 *     summary: Get all book reviews
 *     description: Retrieves a list of all book reviews with related user and book information
 *     tags:
 *       - Book Reviews
 *     responses:
 *       200:
 *         description: Successfully retrieved all book reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                   book:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       title:
 *                         type: string
 *                   rating:
 *                     type: number
 *                   comment:
 *                     type: string
 *                     nullable: true
 */
bookReviewRouter.get("/book-reviews", async (req: Request, res: Response) => {
    let reviews = await BookReview.find({relations: ['user', 'book']});
    let data = plainToInstance(BookReviewList, reviews, {excludeExtraneousValues: true});
    return res.status(200).json(data);
})

/**
 * @swagger
 * /book-reviews/{id}:
 *   delete:
 *     summary: Delete a book review
 *     description: Deletes a book review by its ID
 *     tags:
 *       - Book Reviews
 *     security:
 *       - Bearer: []
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
bookReviewRouter.delete("/book-reviews/:id", authenticate(), async (req: Request, res: Response) => {
    let id = Number(req.params.id);
    let review = await BookReview.findOneBy({ id: id });
    if (review) {
        await BookReview.remove(review);
        return res.status(204).send();
    } else {
        return res.status(404).json({ message: "Review with given id not found" });
    }
})

/**
 * @swagger
 * /book-reviews/{id}:
 *   patch:
 *     summary: Partially update a book review
 *     description: Updates specific fields of a book review. Only non-null values are updated
 *     tags:
 *       - Book Reviews
 *     security:
 *       - Bearer: []
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
 *                 type: number
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
 *                   type: number
 *                 comment:
 *                   type: string
 *                   nullable: true
 *                 updatedAt:
 *                   type: string
 *                 createdAt:
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
bookReviewRouter.patch("/book-reviews/:id", authenticate(), async (req: Request, res: Response) => {
    let id = Number(req.params.id);
    let review = await BookReview.findOneBy({ id: id });
    if (review) {
        Object.assign(review, req.body);
        await BookReview.save(review);
        return res.status(200).json(review);
    } else {
        return res.status(404).json({ message: "Review with given id not found" });
    }
})

// JWT - JSON Web Token