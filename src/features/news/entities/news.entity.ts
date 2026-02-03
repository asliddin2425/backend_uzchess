import { Column, Entity } from "typeorm";
import { BaseModel } from "../../../core/base-model.js";

@Entity("news")
export class News  extends BaseModel{

    @Column({length: 256})
    title!: string;
    
    @Column({length: 4096})
    description!: string;

    @Column({length: 64})
    date!: string; 

    @Column({length: 128})
    newsImgUrl!: string

}