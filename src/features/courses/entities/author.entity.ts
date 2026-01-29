import {
  Column,
  Entity,
  OneToMany,
  Relation
} from "typeorm";
import { BaseModel } from "../../../core/base-model.js";
import { Course } from "./courses.entity.js";

@Entity("authors")
export class Author extends BaseModel {

  @Column({ length: 64})
  firstName!: string;

  @Column({ length: 64 })
  lastName!: string;

  @Column({ length: 64, nullable: true })
  middleName!: string;

  @OneToMany(() => Course, course => course.author)
  courses!: Relation<Course[]>;
}
