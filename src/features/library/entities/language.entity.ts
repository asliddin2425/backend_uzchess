import { Column, Entity, OneToMany, Relation } from "typeorm";
import { Book } from "./book.entity.js";
import { BaseModel } from "../../../core/base-model.js";

@Entity("BookLanguages")

export class Language extends BaseModel{

    @Column({length: 32})
    title!: string;
    
    @Column({length: 16})
    code!: string;

    @OneToMany(() => Book, books => books.languages)
    courses!: Relation<Book[]>;
}