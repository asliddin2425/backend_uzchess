import { Expose, Type } from "class-transformer";

@Expose()
export class CourseList {
    id!: number;

    title!: string;

    imageUrl!: string;

    price!: number;

    discountPrice?: number;

    views?: number;

    likesCount?: number;

    
    @Expose()
    @Type(() => Object)
    author!: any;

    @Expose()
    @Type(() => Object)
    category!: any;

    @Expose()
    @Type(() => Object)
    level!: any;

    @Expose()
    @Type(() => Object)
    section!: any;

    @Expose()
    @Type(() => Object)
    languages!: any;
}