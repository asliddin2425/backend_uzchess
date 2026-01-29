import { IsOptional, IsString, MaxLength, IsInt, Min, Max } from "class-validator";

export class CourseUpdate {
    @IsString()
    @IsOptional()
    @MaxLength(256)
    title!: string;

    @IsString()
    @IsOptional()
    @MaxLength(128)
    imageUrl!: string;

    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(10000000)
    price!: number;

    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(10000000)
    discountPrice?: number;

    @IsInt()
    @IsOptional()
    authorId!: number;

    @IsInt()
    @IsOptional()
    sectionId!: number;

    @IsInt()
    @IsOptional()
    levelId!: number;

    @IsInt()
    @IsOptional()
    categoryId!: number;

    @IsInt()
    @IsOptional()
    languagesId!: number;
}