import { IsString, IsOptional, MaxLength } from "class-validator";
export class AuthorUpdate {
    @IsString()
    @IsOptional()
    @MaxLength(32)
    firstName?: string;
    
    @IsString()
    @IsOptional()
    @MaxLength(32)
    lastName?: string;

    @IsString()
    @IsOptional()
    @MaxLength(32)
    middleName?: string;
}