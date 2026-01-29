import { Router } from "express";
import { Language } from "../entities/language.entity.js";
import { validateDto } from "../../../core/middlewares/validate-body.middleware.js";
import { LanguageList } from "../dto/language/language.list.js";
import { LanguageCreate } from "../dto/language/language.create.js";
import { LanguageUpdate } from "../dto/language/language.update.js";

export const languageRouter = Router();


/**
 * @swagger
 * /languages:
 *   get:
 *     summary: Get all languages
 *     description: Retrieves a list of all available languages
 *     tags:
 *       - CourseLanguages
 *     responses:
 *       200:
 *         description: Successfully retrieved all languages
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
 *                   code:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
languageRouter.get(
    "/languages",
    validateDto(LanguageList),
    async (req, res) => {
    try {
        let languages = await Language.find();
        return res.status(200).json(languages);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});


/**
 * @swagger
 * /languages/{id}:
 *   get:
 *     summary: Get language by ID
 *     description: Retrieves a specific language by its ID
 *     tags:
 *       - CourseLanguages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The language ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the language
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 title:
 *                   type: string
 *                 code:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       404:
 *         description: Language not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
languageRouter.get("/languages/:id", async (req, res) => {
    let id = Number(req.params.id);
    let language = await Language.findOneBy({ id: id as any });
    
    if (language) {
        return res.status(200).json(language);
    } else {
        return res.status(404).json({ message: "Til  topilmadi" });
    }
});


/**
 * @swagger
 * /languages:
 *   post:
 *     summary: Create a new language
 *     description: Creates a new language with the provided details
 *     tags:
 *       - CourseLanguages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - code
 *             properties:
 *               title:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       201:
 *         description: Language successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 title:
 *                   type: string
 *                 code:
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
languageRouter.post(
    "/languages", 
    validateDto(LanguageCreate),
    async (req, res) => {
    try {
        let newLanguage = await Language.save(Language.create(req.body));
        return res.status(201).json(newLanguage);
    } catch (exc: any) {
        return res.status(400).json({ message: exc.message });
    }
});

/**
 * @swagger
 * /languages/{id}:
 *   delete:
 *     summary: Delete a language
 *     description: Deletes a language by its ID
 *     tags:
 *       - CourseLanguages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The language ID
 *     responses:
 *       204:
 *         description: Language successfully deleted
 *       404:
 *         description: Language not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
languageRouter.delete("/languages/:id", async (req, res) => {
    let id = Number(req.params.id);
    let language = await Language.findOneBy({ id: id as any });
    
    if (language) {
        await Language.remove(language);
        return res.status(204).send();
    } else {
        return res.status(404).json({ message: "Til topilmadi" });
    }
});

/**
 * @swagger
 * /languages/{id}:
 *   patch:
 *     summary: Partially update a language
 *     description: Updates specific fields of a language. Only non-null values are updated
 *     tags:
 *       - CourseLanguages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The language ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Language title (max 32 characters, optional)
 *               code:
 *                 type: string
 *                 description: Language code (max 16 characters, optional)
 *     responses:
 *       200:
 *         description: Language successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 title:
 *                   type: string
 *                 code:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       404:
 *         description: Language not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
languageRouter.patch(
    "/languages/:id",
validateDto(LanguageUpdate), 
    async (req, res) => {
    let id = Number(req.params.id);
    let language = await Language.findOneBy({ id: id as any });
    
    if (language) {
        Object.assign(
            language, 
            Object.fromEntries(Object.entries(req.body).filter(([key, value]) => value !== null))
        );
        
        await Language.save(language);
        return res.status(200).json(language);
    } else {
        return res.status(404).json({ message: "Til topilmadi" });
    }
});