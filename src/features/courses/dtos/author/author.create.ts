import {IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";

export class AuthorCreate {
    @IsString()
    @MaxLength(16)
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @MaxLength(16)
    @IsNotEmpty()
    lastName!: string;

    @IsString()
    @MaxLength(16)
    @IsOptional()
    middleName?: string;
}