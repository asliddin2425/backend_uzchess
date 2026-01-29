import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class SectionCreate {
    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    title!: string;
}