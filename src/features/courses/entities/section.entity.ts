import { Column, Entity, OneToMany, Relation } from "typeorm";

import { BaseModel } from "../../../core/base-model.js";
import { Course } from "./courses.entity.js";

@Entity("sections")
export class Section extends BaseModel {

    @Column({ length: 32 })
    title!: string;

   @OneToMany(()=> Course, courses=> courses.section)
   courses!: Relation<Course[]>
    
}