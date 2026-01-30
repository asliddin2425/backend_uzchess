import {BaseModel} from "../../../core/base-model.js";
import {Column, Entity, JoinColumn, ManyToOne, Relation} from "typeorm";
import {User} from "../../authentication/entities/user.entity.js";
import {Book} from "./book.entity.js";



@Entity("bookReviews")
export class BookReview extends BaseModel {
    @Column()
    userId!: number;

    @ManyToOne(() => User, user => user.bookReviews, {onDelete: "CASCADE"})
    @JoinColumn({name: "userId"})
    user?: Relation<User>;

    @Column()
    bookId!: number;

    @ManyToOne(() => Book, book => book.reviews, {onDelete: "CASCADE"})
    @JoinColumn({name: "bookId"})
    book?: Relation<Book>;

    @Column()
    rating!: number;

    @Column({length: 1024, nullable: true})
    comment?: string;
}