import { plainToInstance} from "class-transformer";
import { NewsList } from "../dtos/news.list.js";
import { News } from "../entities/news.entity.js";
import { Request, Response, Router } from "express";
import { validateDto } from "../../../core/middlewares/validate-body.middleware.js";
import { newsCreate } from "../dtos/news.dto.js";
import { authenticate } from "../../../core/middlewares/authenticate.middleware.js";
import { Roles } from "../../../core/constants/roles.js";
export const newsRouter = Router();

newsRouter.get(
    "./news", 
    validateDto(NewsList),
    async (req: Request, res: Response) => {
        let news = await News.find();
        let data = plainToInstance(NewsList, news);
        return res.status(200).json(news);
    }
)



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


// newsRouter.post(
//     "/news",
//     authenticate(Roles.Admin),
//     validateDto(newsCreate), 
//     async (req: Request, res: Response) => {
//         try {
//             let newNews: News = await News.save(News.create(req.body));
//         } catch (exc: any) {
//             return res.status(400).json({message: exc.message})
//         }
//     }
// )

newsRouter.post(
    "/news",
    authenticate(Roles.Admin),
    validateDto(newsCreate)
)