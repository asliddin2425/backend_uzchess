import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class BookCreate {
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    title!: string;
}