import { IsString, MaxLength, IsOptional } from "class-validator";

export class CategoryUpdate {
    @IsString()
    @IsOptional()
    @MaxLength(32)
    title!: string;
}