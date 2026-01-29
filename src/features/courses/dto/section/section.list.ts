import { Expose } from "class-transformer";

@Expose()
export class SectionList {
    @Expose()
    id!: number;

    @Expose()
    title!: string;
}