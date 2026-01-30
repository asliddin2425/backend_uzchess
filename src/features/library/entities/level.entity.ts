import { Entity, Column, ManyToMany, OneToMany, Relation } from "typeorm";
import { BaseModel } from "../../../core/base-model.js";
import { Book} from "./book.entity.js";


@Entity("levels")
export class Level extends BaseModel{

    @Column({length: 32})
    title!: string;

    @OneToMany(() => Book, books=>books.level)
    courses!: Relation<Book[]>;
}
