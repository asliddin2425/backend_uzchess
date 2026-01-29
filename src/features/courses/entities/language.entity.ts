import { Column, Entity, OneToMany, Relation } from "typeorm";
import { Course } from "./courses.entity.js";
import { BaseModel } from "../../../core/base-model.js";

@Entity("languages")

export class Language extends BaseModel{

    @Column({length: 32})
    title!: string;
    
    @Column({length: 16})
    code!: string;

    @OneToMany(() => Course, courses => courses.languages)
    courses!: Relation<Course[]>;
}