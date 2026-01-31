import { IsString, IsOptional, MaxLength } from "class-validator";

export class SectionUpdate {
    @IsString()
    @IsOptional()
    @MaxLength(32)
    title?: string;

}