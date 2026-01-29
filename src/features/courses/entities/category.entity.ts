import { Entity, Column, OneToMany, Relation } from "typeorm";
import { BaseModel } from "../../../core/base-model.js";
import { Course } from "./courses.entity.js";
@Entity("categories")
export class Category extends BaseModel{

    @Column({length: 32})
    title!: string;

    @OneToMany(() => Course, course => course.category)
    courses!: Relation<Course[]>
}