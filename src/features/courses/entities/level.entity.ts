import { Entity, Column, ManyToMany, OneToMany, Relation } from "typeorm";
import { BaseModel } from "../../../core/base-model.js";
import { Course } from "./courses.entity.js";


@Entity("levels")
export class Level extends BaseModel{

    @Column({length: 32})
    title!: string;

    @OneToMany(() => Course, courses=>courses.level)
    courses!: Relation<Course[]>;
}
