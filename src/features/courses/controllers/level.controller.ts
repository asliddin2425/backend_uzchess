import { Router } from "express";
import { Level } from "../entities/level.entity.js";
import { validateDto } from "../../../core/middlewares/validate-body.middleware.js";
import { LevelUpdate } from "../dto/level/level.update.js";
import { LevelCreate } from "../dto/level/level.create.js";
import { LevelList } from "../dto/level/level.list.js";

export const levelRouter = Router();

/**
 * @swagger
 * /levels:
 *   get:
 *     summary: Get all levels
 *     description: Retrieves a list of all course levels
 *     tags:
 *       - CourseLevels
 *     responses:
 *       200:
 *         description: Successfully retrieved all levels
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
levelRouter.get(
    "/levels", 
    validateDto(LevelList)
,    async (req, res) => {
    let levels = await Level.find();
    return res.status(200).json(levels);
})

/**
 * @swagger
 * /levels:
 *   post:
 *     summary: Create a new level
 *     description: Creates a new course level with the provided details
 *     tags:
 *       - CourseLevels
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
 *     responses:
 *       201:
 *         description: Level successfully created
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
levelRouter.post("/levels", async (req, res)=> {
    try {
        let newLevel: Level = await Level.save(Level.create(req.body));
        return res.status(201).json(newLevel);
    } catch (exc: any) {
        return res.status(400).json({message: exc.message})
    }
});

/**
 * @swagger
 * /levels/{id}:
 *   post:
 *     summary: Get level by ID
 *     description: Retrieves a specific level by its ID
 *     tags:
 *       - CourseLevels
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The level ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the level
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
 *         description: Level not found
 */
levelRouter.post(
    "/levels/:id", 
    validateDto(LevelCreate),
    async (req, res) =>{
    let id = Number(req.params.id);
    let level = await Level.findOneBy({id: id});
    if (level) {
        return res.status(200).json(level);   
    } else {
        return res.status(404).send()
    }
})

/**
 * @swagger
 * /levels/{id}:
 *   delete:
 *     summary: Delete a level
 *     description: Deletes a level by its ID
 *     tags:
 *       - CourseLevels
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The level ID
 *     responses:
 *       204:
 *         description: Level successfully deleted
 *       404:
 *         description: Level not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
levelRouter.delete("/levels/:id", async (req, res) =>{
    let id = Number(req.params.id);
    let level = await Level.findOneBy({id: id});
    if (level) {
        await Level.remove(level);
        return res.status(204).json(level);
    } else {
        return res.status(404).json({message: "Level with given id not found"});
    }
})


/**
 * @swagger
 * /levels/{id}:
 *   patch:
 *     summary: Partially update a level
 *     description: Updates specific fields of a level. Only non-null values are updated
 *     tags:
 *       - CourseLevels
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The level ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Level title (max 32 characters, optional)
 *     responses:
 *       200:
 *         description: Level successfully updated
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
 *       404:
 *         description: Level not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
levelRouter.patch(
    "/levels/:id",
    validateDto(LevelUpdate), 
    async(req, res) => {
    let id = Number(req.params.id);
    let level = await Level.findOneBy({id: id});
    if (level) {
        Object.assign(
            level, 
            Object.fromEntries(Object.entries(req.body).filter(([key, value]) => value !==null))
        )
        await Level.save(level);
        return res.status(200).json(level);
    } else {
        return res.status(404).json({message: "Level with given id not found"})
    }
})
