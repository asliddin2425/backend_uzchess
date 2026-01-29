import {Router} from "express";
import {Author} from "../entities/author.entity.js";

export const authorRouter = Router();


/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     description: Retrieves a list of all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: Successfully retrieved all authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   middleName:
 *                     type: string
 *                     nullable: true
 */
authorRouter.get("/authors", async (req, res) => {
    let authors = await Author.find();
    return res.status(200).json(authors);
})

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     description: Retrieves a specific author by their ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The author ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the author
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 middleName:
 *                   type: string
 *                   nullable: true
 *       404:
 *         description: Author not found
 */
authorRouter.get("/authors/:id", async (req, res) => {
    let id = Number(req.params.id);
    let author = await Author.findOneBy({id: id});
    if (author) {
        return res.status(200).json(author);
    } else {
        return res.status(404).send();
    }
})

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     description: Creates a new author with the provided details
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Author's first name (max 32 characters)
 *               lastName:
 *                 type: string
 *                 description: Author's last name (max 32 characters)
 *               middleName:
 *                 type: string
 *                 description: Author's middle name (max 32 characters, optional)
 *     responses:
 *       201:
 *         description: Author successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 middleName:
 *                   type: string
 *                   nullable: true
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
authorRouter.post("/authors", async (req, res) => {
    try {
        let newAuthor: Author = await Author.save(Author.create(req.body));
        return res.status(201).json(newAuthor);
    } catch (exc: any) {
        return res.status(400).json({message: exc.message});
    }
})

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     description: Deletes an author by their ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The author ID
 *     responses:
 *       204:
 *         description: Author successfully deleted
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
authorRouter.delete("/authors/:id", async (req, res) => {
    let id = Number(req.params.id);
    let author = await Author.findOneBy({id: id});
    if (author) {
        await Author.remove(author);
        return res.status(204).send();
    } else {
        return res.status(404).json({message: "Author with given id not found"});
    }
})

/**
 * @swagger
 * /authors/{id}:
 *   patch:
 *     summary: Partially update an author
 *     description: Updates specific fields of an author. Only non-null values are updated
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Author's first name (max 32 characters, optional)
 *               lastName:
 *                 type: string
 *                 description: Author's last name (max 32 characters, optional)
 *               middleName:
 *                 type: string
 *                 description: Author's middle name (max 32 characters, optional)
 *     responses:
 *       200:
 *         description: Author successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 middleName:
 *                   type: string
 *                   nullable: true
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
authorRouter.patch("/authors/:id", async (req, res) => {
    let id = Number(req.params.id);
    let author = await Author.findOneBy({id: id});
    if (author) {
        Object.assign(
            author,
            Object.fromEntries(Object.entries(req.body).filter(([key, value]) => value !== null))
        )
        await Author.save(author);
        return res.status(200).json(author);
    } else {
        return res.status(404).json({message: "Author with given id not found"});
    }
})