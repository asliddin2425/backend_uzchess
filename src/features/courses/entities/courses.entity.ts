import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Relation
} from "typeorm";
import { BaseModel } from "../../../core/base-model.js";
import { Author } from "./author.entity.js";
import { Language } from "./language.entity.js";
import { CourseReview } from "./course-review.entity.js";
import { Level } from "./level.entity.js";
import { Section } from "./section.entity.js";
import { Category } from "./category.entity.js";

@Entity("courses")
export class Course extends BaseModel {

    @Column({ length: 256 })
    title!: string;

    @Column({ type: "varchar" , length: 128})  
    imageUrl!: string;

    @Column({ type: "int", nullable: true })
    discountPrice?: number;

    @Column({ type: "int" })
    price!: number;

    @Column({ default: 0, nullable: true })
    views?: number;

    @Column({ default: 0, nullable: true })
    likesCount?: number;

    @Column({type: "int"})
    authorId!: number;

    @Column({type: "int"})
    sectionId!: number;

    @Column({type: "int"})
    levelId!: number;

    @Column({type: "int"})
    categoryId!: number;

    @Column({type: "int"})
    languagesId!: number;
    
    @ManyToOne(() => Author, author => author.courses, { onDelete: "CASCADE" })
    @JoinColumn({ name: "authorId" })
    author!: Relation<Author>;

    @ManyToOne(()=> Language, languages => languages.courses, {onDelete: "CASCADE"})
    @JoinColumn({name: "languagesId"})
    languages!: Relation<Language>;

    @ManyToOne(()=> Level, level=>level.courses, {onDelete: "CASCADE"} )
    @JoinColumn({name: "levelId"})
    level!: Relation<Level>;

    @ManyToOne(() => Section, section=> section.courses, {onDelete: "CASCADE"})
    @JoinColumn({name: "sectionId"})
    section!: Relation<Section>;

    @ManyToOne(()=> Category, category=> category.courses, {onDelete: "CASCADE"})
    @JoinColumn({name: "categoryId"})
    category!: Relation<Category>;

    @OneToMany(() => CourseReview, review => review.course)
    reviews?: Relation<CourseReview[]>;
}
