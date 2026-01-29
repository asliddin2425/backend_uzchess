import { IsInt, IsNotEmpty, IsString, Max, max, MaxLength, Min } from "class-validator";
import { IntegerType } from "typeorm/browser";

export class CourseCreate {

    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    title!: string;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(128)
    imageUrl!: string;

    @IsInt()
    @Min(0)
    @Max(10000000)
    discountPrice?: number;

    @IsInt()
    @Min(0)
    @Max(10000000)
    price!: number;
    
    @IsInt()
    @IsNotEmpty()
    authorId!: number;

    @IsInt()
    @IsNotEmpty()
    sectionId!: number;

    @IsInt()
    @IsNotEmpty()
    levelId!: number;

    @IsInt()
    @IsNotEmpty()
    categoryId!: number;

    @IsInt()
    @IsNotEmpty()
    languagesId!: number;
}