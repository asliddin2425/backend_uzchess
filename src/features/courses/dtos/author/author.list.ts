import { Expose } from "class-transformer";

@Expose()
export class AuthorList {
    id!: number;

    firstName!: string;

    lastName!: string;

    middleName?: string;

}