import {Expose, Type} from "class-transformer";
import {BookList} from "../book/book.list.js";
import {UserList} from "../../../authentication/dtos/user/user.list.js";

export class BookReviewList {
    @Expose()
    id!: number;

    @Expose()
    @Type(() => UserList)
    user!: UserList;

    @Expose()
    @Type(() => BookList)
    book!: BookList;

    @Expose()
    rating!: number;

    @Expose()
    comment?: string | null;
}