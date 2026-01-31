import { Entity, Column, OneToMany, Relation } from "typeorm";
import { BaseModel } from "../../../core/base-model.js";
import { Book } from "./book.entity.js";
@Entity("bookCategories")
export class Category extends BaseModel{

    @Column({length: 32})
    title!: string;

    @OneToMany(() => Book, books => books.category)
    courses!: Relation<Book[]>
}