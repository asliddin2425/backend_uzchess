import { Expose } from "class-transformer";

@Expose()
export class LanguageList {
    id!: number;

    title!: string;


    code!: string;
}