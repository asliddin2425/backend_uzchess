import { Router } from "express";
import { validateDto } from "../../../core/middlewares/validate-body.middleware.js";
import { Course } from "../entities/courses.entity.js";
import { upload } from "../../../core/middlewares/upload.middleware.js";
import { CourseCreate } from "../dtos/course/course.create.js";
import { CourseUpdate } from "../dtos/course/course.update.js";
import {plainToInstance} from "class-transformer";
import { CourseList } from "../dtos/course/course.list.js";
import { authenticate } from "../../../core/middlewares/authenticate.middleware.js";
import { Roles } from "../../../core/constants/roles.js";

 export const courseRouter = Router();


/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     description: Retrieves a list of all courses with their details
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: Successfully retrieved all courses
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
 *                   imageUrl:
 *                     type: string
 *                   price:
 *                     type: number
 *                   discountPrice:
 *                     type: number
 *                     nullable: true
 *                   authorId:
 *                     type: number
 *                   sectionId:
 *                     type: number
 *                   levelId:
 *                     type: number
 *                   categoryId:
 *                     type: number
 *                   languagesId:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 */
courseRouter.get(
    "/courses", 
    validateDto(CourseList),
    async (req, res) => {
    let courses = await Course.find();
    let data = plainToInstance(CourseList, courses);
    return res.status(200).json(courses)
})


/**
 * @swagger
 * /course/{id}:
 *   get:
 *     summary: Get course by ID
 *     description: Retrieves a specific course by its ID
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 title:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                 price:
 *                   type: number
 *                 discountPrice:
 *                   type: number
 *                   nullable: true
 *                 authorId:
 *                   type: number
 *                 sectionId:
 *                   type: number
 *                 levelId:
 *                   type: number
 *                 categoryId:
 *                   type: number
 *                 languagesId:
 *                   type: number
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       404:
 *         description: Course not found
 */
courseRouter.get("/course/:id", async (req, res) =>{
    let id = Number(req.params.id);
    let course = await Course.findOneBy({id: id});
    if(course) {
        return res.status(200).json(course);
    } else {
        return res.status(404).send();
    }
})



/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     description: Creates a new course with the provided details
 *     tags:
 *       - Courses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - imageUrl
 *               - price
 *               - authorId
 *               - sectionId
 *               - levelId
 *               - categoryId
 *               - languagesId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Course title (max 150 characters)
 *               imageUrl:
 *                 type: string
 *                 description: Course image URL
 *               price:
 *                 type: number
 *                 description: Course price
 *               discountPrice:
 *                 type: number
 *                 description: Discounted price (optional)
 *               authorId:
 *                 type: number
 *                 description: Author ID
 *               sectionId:
 *                 type: number
 *                 description: Section ID
 *               levelId:
 *                 type: number
 *                 description: Level ID
 *               categoryId:
 *                 type: number
 *                 description: Category ID
 *               languagesId:
 *                 type: number
 *                 description: Language ID
 *     responses:
 *       201:
 *         description: Course successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 title:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                 price:
 *                   type: number
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
courseRouter.post(
    "/courses",
    authenticate(Roles.Admin),
    validateDto(CourseCreate),
    async (req, res) => {
    try {
        let newCourse: Course = await Course.save(Course.create(req.body));
        return res.status(201).json(newCourse);
    } catch (exc: any) {
        return res.status(400).json({message: exc.message})
    }
})




/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     description: Deletes a course by its ID
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The course ID
 *     responses:
 *       204:
 *         description: Course successfully deleted
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
courseRouter.delete(
    "/courses/:id", 
    authenticate(Roles.Admin),
    async (req, res) =>{
    let id = Number(req.params.id);
    let course = await Course.findOneBy({id: id});
    if(course) {
        await Course.remove(course);
        return res.status(204).send();
    } else {
        return res.status(404).json({message: "Course with given id not found"})
    }
})




/**
 * @swagger
 * /courses/{id}:
 *   patch:
 *     summary: Partially update a course
 *     description: Updates specific fields of a course. Only non-null values are updated
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Course title (max 150 characters, optional)
 *               imageUrl:
 *                 type: string
 *                 description: Course image URL (optional)
 *               price:
 *                 type: number
 *                 description: Course price (optional)
 *               discountPrice:
 *                 type: number
 *                 description: Discounted price (optional)
 *               authorId:
 *                 type: number
 *                 description: Author ID (optional)
 *               sectionId:
 *                 type: number
 *                 description: Section ID (optional)
 *               levelId:
 *                 type: number
 *                 description: Level ID (optional)
 *               categoryId:
 *                 type: number
 *                 description: Category ID (optional)
 *               languagesId:
 *                 type: number
 *                 description: Language ID (optional)
 *     responses:
 *       200:
 *         description: Course successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 title:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                 price:
 *                   type: number
 *                 updatedAt:
 *                   type: string
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
courseRouter.patch(
    "/courses/:id",
    authenticate(Roles.Admin),
    validateDto(CourseUpdate),
    async (req, res) =>{
    let id = Number(req.params.id);
    let course = await Course.findOneBy({id: id});
    if(course) {
        Object.assign(
            course,
            Object.fromEntries(Object.entries(req.body).filter(([key, value]) => value !==null))
        )
        await Course.save(course);
        return res.status(200).json(course);
    } else {
        return res.status(404).json({message: "Course with given id not found"})
    }
})
