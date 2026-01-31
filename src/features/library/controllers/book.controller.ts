import {Router, Request, Response} from "express";
import {validateDto} from "../../../core/middlewares/validate-body.middleware.js";
import {BookCreate} from "../dtos/book/book.create.js";
import {BookUpdate} from "../dtos/book/book.update.js";
import {Book} from "../entities/book.entity.js";
import {plainToInstance} from "class-transformer";
import {BookList} from "../dtos/book/book.list.js";
import { authenticate } from "../../../core/middlewares/authenticate.middleware.js";
import { Roles } from "../../../core/constants/roles.js";

export const bookRouter = Router();

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     description: Creates a new book with the provided title
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: Book title (max 256 characters)
 *                 maxLength: 256
 *     responses:
 *       201:
 *         description: Book successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 title:
 *                   type: string
 *       400:
 *         description: Invalid request data or validation error
 */
bookRouter.post(
    "/books",
    authenticate(Roles.Admin),
    validateDto(BookCreate),
    async (req: Request, res: Response) => {
        let newBook: Book = Book.create(req.body);
        await Book.save(newBook);
        return res.status(201).json(newBook);
    });

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Retrieves a list of all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Successfully retrieved all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   title:
 *                     type: string
 */
bookRouter.get(
    "/books",
    validateDto(BookList),
    async (req: Request, res: Response) => {
        let books = await Book.find();
        let data = plainToInstance(BookList, books);
        return res.status(200).json(data);
    })

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     description: Deletes a book by its ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The book ID
 *     responses:
 *       204:
 *         description: Book successfully deleted
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
bookRouter.delete(
    "/books/:id", 
    authenticate(Roles.Admin),
    async (req: Request, res: Response) => {
    let id = Number(req.params.id);
    let book = await Book.findOneBy({id});
    if (!book) {
        return res.status(404).json({message: "Not found"});
    }
    await Book.remove(book);
    return res.status(204).send();
});

/**
 * @swagger
 * /books/{id}:
 *   patch:
 *     summary: Partially update a book
 *     description: Updates specific fields of a book. Only provided fields are updated
 *     tags:
 *       - Books
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 title:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
bookRouter.patch(
    "/books/:id",
    authenticate(Roles.Admin),
    validateDto(BookUpdate),
    async (req, res) =>{
    let id = Number(req.params.id);
    let book = await Book.findOneBy({id: id});
    if(book) {
        Object.assign(
            book,
            Object.fromEntries(Object.entries(req.body).filter(([key, value]) => value !==null))
        )
        await Book.save(book);
        return res.status(200).json(book);
    } else {
        return res.status(404).json({message: "Books with given id not found"})
    }
}
);