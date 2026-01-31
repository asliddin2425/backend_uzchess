import { IsInt, IsOptional, IsString, MaxLength } from "class-validator";

export class CourseReviewUpdate {
    @IsInt()
    @IsOptional()
    rating?: number;

    @IsString()
    @IsOptional()
    @MaxLength(1024)
    comment?: string | null;
}