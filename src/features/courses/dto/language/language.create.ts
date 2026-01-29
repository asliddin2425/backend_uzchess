import { IsString, MaxLength, IsNotEmpty } from "class-validator";

export class LanguageCreate {
    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    title!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(16)
    code!: string;
}