import {Expose} from "class-transformer";

export class BookList {
    @Expose()
    id!: number;
    
    @Expose()
    title!: string;
}