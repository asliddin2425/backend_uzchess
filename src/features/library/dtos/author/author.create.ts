import {IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";

export class AuthorCreate {
    @IsString()
    @MaxLength(32)
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @MaxLength(32)
    @IsNotEmpty()
    lastName!: string;

    @IsString()
    @MaxLength(16)
    @IsOptional()
    middleName?: string;
}