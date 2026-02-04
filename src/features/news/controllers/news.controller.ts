import { plainToInstance} from "class-transformer";
import { NewsList } from "../dtos/news.list.js";
import { News } from "../entities/news.entity.js";
import { Request, response, Response, Router } from "express";
import { validateDto } from "../../../core/middlewares/validate-body.middleware.js";
import { newsCreate } from "../dtos/news.dto.js";
import { authenticate } from "../../../core/middlewares/authenticate.middleware.js";
import { Roles } from "../../../core/constants/roles.js";
import { NewsUpdate } from "../dtos/news.update.js";
export const newsRouter = Router();



/**
 * @swagger
 * /news:
 *   get:
 *     summary: Get all news
 *     description: Retrieve all news
 *     tags:
 *       - News
 *     responses:
 *       200:
 *         description: List of news
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
 *                     maxLength: 256
 *                   description:
 *                     type: string
 *                     maxLength: 4096
 *                   date:
 *                     type: string
 *                     example: 2026-02-04
 *                   newsImgUrl:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 */

newsRouter.get(
    "/news", 
    // validateDto(NewsList),
    async (req: Request, res: Response) => {
        let news = await News.find();
        let data = plainToInstance(NewsList, news);
        return res.status(200).json(data);
    }
)


/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get news by ID
 *     tags:
 *       - News
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: News found
 *       404:
 *         description: News not found
 */



newsRouter.get(
    "/news/:id", 
    async (req: Request, res: Response) => {
        let id = Number(req.params.id);
        let news = await News.findOneBy({id});
        if (news) {
            return res.status(200).json(news);
        } else return res.status(404).json({message: "Nor found"})
    }

)


/**
 * @swagger
 * /news:
 *   post:
 *     summary: Create news
 *     description: Create new news (Admin only)
 *     tags:
 *       - News
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 256
 *               description:
 *                 type: string
 *                 maxLength: 4096
 *               date:
 *                 type: string
 *                 example: 2026-02-04
 *               newsImgUrl:
 *                 type: string
 *                 example: https://site.com/news.png
 *     responses:
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

newsRouter.post(
    "/news",
    // authenticate(Roles.Admin),
    validateDto(newsCreate),
    async (req: Request, res: Response) => {
        try {
            let newNews: News = await News.save(News.create(req.body));
            return res.status(201).json(newNews);
        } catch  (exc: any) {
            return res.status(400).json({message: exc.message})
        }
    }
)


/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Delete news
 *     description: Delete news (Admin only)
 *     tags:
 *       - News
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */



newsRouter.delete(
    "/news/:id", 
    // authenticate(Roles.Admin),
    async (req: Request, res: Response) => {
        let id= Number(req.params.id);
        let news = await News.findOneBy({id});
        if (news) {
            await News.remove(news)
            return res.status(204).send();
        } else {
            return res.status(404).json({message: " News  with  given id not found"})
        }
    }
)

/**
 * @swagger
 * /news/{id}:
 *   patch:
 *     summary: Update news
 *     description: Update news (Admin only)
 *     tags:
 *       - News
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *               newsImgUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: News not found
 */


newsRouter.patch(
    "/news/:id", 
    authenticate(Roles.Admin),
    validateDto(NewsUpdate),
    async (req: Request, res: Response) => {
        let id = Number(req.params.id);
        let news = await News.findOneBy({id});
        if(news) {
            Object.assign(
                news, 
                Object.fromEntries(Object.entries(req.body).filter(([key, value]) => value))
            );
            await News.save(news);
            return res.status(200).json(news);
        }  else {
            return res.status(404).json({message: "News with given id not found"})
        }
    }
)