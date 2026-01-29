import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LevelCreate {

    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    title!: string;
}