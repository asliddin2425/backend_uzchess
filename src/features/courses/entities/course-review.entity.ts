import {BaseModel} from "../../../core/base-model.js";
import {Column, Entity, JoinColumn, ManyToOne, Relation} from "typeorm";
import {User} from "../../authentication/entities/user.entity.js";
import {Course} from "../entities/courses.entity.js";


@Entity("courseReviews")
export class CourseReview extends BaseModel {
    @Column()
    userId!: number;

    @ManyToOne(() => User, user => user.courseReviews, {onDelete: "CASCADE"})
    @JoinColumn({name: "userId"})
    user?: Relation<User>;

    @Column()
    courseId!: number;

    @ManyToOne(() => Course, course => course.reviews, {onDelete: "CASCADE"})
    @JoinColumn({name: "courseId"})
    course?: Relation<Course>;

    @Column()
    rating!: number;

    @Column({length: 1024, nullable: true})
    comment?: string;
}