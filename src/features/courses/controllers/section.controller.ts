import { Router } from "express";

import { Section } from "../entities/section.entity.js";
import { validateDto } from "../../../core/middlewares/validate-body.middleware.js";
import { SectionUpdate } from "../dtos/section/section.update.js";
import { SectionCreate } from "../dtos/section/section.create.js";
import { SectionList } from "../dtos/section/section.list.js";

export const  sectionRouter = Router();

/**
 * @swagger
 * /sections:
 *   get:
 *     summary: Get all sections
 *     description: Retrieves a list of all course sections
 *     tags:
 *       - CourseSections
 *     responses:
 *       200:
 *         description: Successfully retrieved all sections
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
sectionRouter.get(
    "/sections",
    validateDto(SectionList), 
    async (req, res) => {
    let sections = await Section.find();
    return res.status(200).json(sections)
})

/**
 * @swagger
 * /sections/{id}:
 *   get:
 *     summary: Get section by ID
 *     description: Retrieves a specific section by its ID
 *     tags:
 *       - CourseSections
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The section ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the section
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
 *         description: Section not found
 */
sectionRouter.get("/sections/:id", async (req, res) =>{
    let id = Number (req.params.id);
    let section = await Section.findOneBy({id: id})
    if(section) {
        return res.status(200).json(section)
    } else {
        return res.status(404).send();
    }
})



/**
 * @swagger
 * /sections:
 *   post:
 *     summary: Create a new section
 *     description: Creates a new course section with the provided details
 *     tags:
 *       - CourseSections
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
 *         description: Section successfully created
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
sectionRouter.post(
    "/sections", 
    validateDto(SectionCreate),
    async (req, res) => {
    try {
        let newSection: Section = await  Section.save(Section.create(req.body));
        return res.status(201).json(newSection);
    } catch (exc: any) {
        return res.status(400).json({message: exc.message})
    }
})

/**
 * @swagger
 * /sections/{id}:
 *   delete:
 *     summary: Delete a section
 *     description: Deletes a section by its ID
 *     tags:
 *       - CourseSections
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The section ID
 *     responses:
 *       204:
 *         description: Section successfully deleted
 *       404:
 *         description: Section not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
sectionRouter.delete("/sections/:id", async (req, res) =>{
    let id = Number(req.params.id);
    let section = await Section.findOneBy({id: id});
    if (section) {
        await Section.remove(section);
        return res.status(204).send()
    } else {
        return res.status(404).json({message: "Section with given id not found"})
    }
})

/**
 * @swagger
 * /sections/{id}:
 *   patch:
 *     summary: Partially update a section
 *     description: Updates specific fields of a section. Only non-null values are updated
 *     tags:
 *       - CourseSections
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The section ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Section title (max 150 characters, optional)
 *     responses:
 *       200:
 *         description: Section successfully updated
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
 *         description: Section not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
sectionRouter.patch(
    "/sections/:id", 
    validateDto(SectionUpdate),
    async (req, res) =>{
    let id = Number(req.params.id);
    let section  = await Section.findOneBy({id: id});
    if(section) {
        Object.assign(
            section, 
            Object.fromEntries(Object.entries(req.body).filter(([key, value]) => value !== null))
        )
        await Section.save(section);
        return res.status(200).json(section)
    } else {
        return res.status(404).json({message: "Section with given id not found"})
    }
})


