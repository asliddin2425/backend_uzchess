import { IsOptional, IsString, MaxLength } from "class-validator";

export class LevelUpdate {
    @IsString()
    @IsOptional()
    @MaxLength(32)
    title!: string;
}