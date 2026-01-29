import {Expose, Type} from "class-transformer";
import { CourseList } from "../course/course.list.js";
import {UserList} from "../../../authentication/dtos/user/user.list.js";

export class CourseReviewList {
    @Expose()
    id!: number;

    @Expose()
    @Type(() => UserList)
    user!: UserList;

    @Expose()
    @Type(() => CourseList)
    book!: CourseList;

    @Expose()
    rating!: number;

    @Expose()
    comment?: string | null;
}