import { Expose } from "class-transformer";

@Expose()
export class CategoryList {
    id!: number;

    title!: string;
}