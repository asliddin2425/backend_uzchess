import { IsString, MaxLength, IsOptional } from "class-validator";

export class LanguageUpdate {
    @IsString()
    @IsOptional()
    @MaxLength(32)
    title!: string;

    @IsString()
    @IsOptional()
    @MaxLength(16)
    code!: string;
}