import {IsInt, IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";

export class BookReviewCreate {
    @IsInt()
    @IsNotEmpty()
    bookId!: number;

    @IsInt()
    @IsNotEmpty()
    rating!: number;

    @IsString()
    @IsOptional()
    @MaxLength(1024)
    comment?: string | null;
}