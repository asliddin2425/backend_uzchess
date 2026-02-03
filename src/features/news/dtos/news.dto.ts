import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class newsCreate{
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    title!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(4096)
    description!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(128)
    newsImgUrl!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    date!: string;
}