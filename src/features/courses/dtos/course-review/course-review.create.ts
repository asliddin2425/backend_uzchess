import { IsInt, IsNotEmpty, IsString, IsOptional, MaxLength } from "class-validator";

export class CourseReviewCreate {
    @IsInt()
    @IsNotEmpty()
    courseId!: number

    @IsInt()
    @IsNotEmpty()
    rating!: number;

    @IsString()
    @IsOptional()
    @MaxLength(1024)
    comment?: string | null;
}