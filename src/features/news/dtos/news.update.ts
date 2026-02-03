import { IsOptional, IsString, MaxLength } from "class-validator";

export class NewsUpdate {

    @IsString()
    @IsOptional()
    @MaxLength(256)
    title?: string;

    @IsString()
    @IsOptional()
    @MaxLength(4096)
    description?: string;

    @IsString()
    @IsOptional()
    @MaxLength(128)
    newsImgUrl?: string;

    @IsString()
    @IsOptional()
    @MaxLength(64)
    date?: string;
}