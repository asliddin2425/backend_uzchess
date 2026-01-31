import { Router } from "express";
import { Category } from "../entities/category.entity.js";
import { validateDto } from "../../../core/middlewares/validate-body.middleware.js";
import { CategoryCreate } from "../dtos/category/category.create.js";
import { CategoryUpdate } from "../dtos/category/category.update.js";
import { CategoryList } from "../dtos/category/category.list.js";
import { authenticate } from "../../../core/middlewares/authenticate.middleware.js";
import { Roles } from "../../../core/constants/roles.js";

export const categoryRouter = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieves a list of all categories
 *     tags:
 *       - CourseCategories
 *     responses:
 *       200:
 *         description: Successfully retrieved all categories
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
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 */
categoryRouter.get(
    "/categories",
    validateDto(CategoryList), 
    async (req, res) =>{
    let categories = await Category.find();
    return res.status(200).json(categories)
})

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     description: Retrieves a specific category by its ID
 *     tags:
 *       - CourseCategories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 title:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       404:
 *         description: Category not found
 */
categoryRouter.get("/categories/:id", async (req, res) =>{
    let id = Number(req.params.id);
    let category = await Category.findOneBy({id: id})
    if (category) {
        return res.status(200).json(category);
    } else {
        return res.status(404).send();
    }
})

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Creates a new category with the provided details
 *     tags:
 *       - CourseCategories
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
 *                 description: Category title (max 32 characters)
 *     responses:
 *       201:
 *         description: Category successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 title:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
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
categoryRouter.post(
    "/categories",
    authenticate(Roles.Admin),
    validateDto(CategoryCreate),
    async (req, res) => {
    try {
        let newCategory: Category = await Category.save(Category.create(req.body));
        return res.status(201).json(newCategory);
    } catch (exc: any) {
        return res.status(400).json({message: exc.message});
    }
})

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Deletes a category by its ID
 *     tags:
 *       - CourseCategories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The category ID
 *     responses:
 *       204:
 *         description: Category successfully deleted
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
categoryRouter.delete(
    "/categories/:id", 
    authenticate(Roles.Admin),
    async (req, res) =>{
    let id = Number(req.params.id);
    let category = await Category.findOneBy({id: id});
    if(category) {
        await Category.remove(category);
        return res.status(204).send();
    } else {
        return res.status(404).json({messgae: " Category with given id not found"})
    }
})


/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Partially update a category
 *     description: Updates specific fields of a category. Only non-null values are updated
 *     tags:
 *       - CourseCategories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The category ID
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
 *         description: Category successfully updated
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
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


categoryRouter.patch(
    "/categories/:id",
    authenticate(Roles.Admin),
    validateDto(CategoryUpdate),
    async (req, res) => {
    let id = Number(req.params.id);
    let category = await Category.findOneBy({id: id});
    if (category) {
        Object.assign(
            category,
            Object.fromEntries(Object.entries(req.body).filter(([key, value]) => value !== null))
        )
        await Category.save(category);
        return res.status(200).json(category);
    } else {
        return res.status(404).json({message: "Category with given id not found"});
    }
})