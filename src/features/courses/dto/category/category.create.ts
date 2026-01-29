import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CategoryCreate {

    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    title!: string;
}