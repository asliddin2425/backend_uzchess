import { Expose } from "class-transformer";

Expose()
export class NewsList {

    id!: number;

    title!: string

    description!: string;

    newsImgUrl!: string;
    
    date!: string;
}