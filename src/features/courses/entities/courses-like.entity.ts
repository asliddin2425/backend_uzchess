// import { Column, Entity, ManyToOne, JoinColumn, Relation } from "typeorm";
// import { BaseModel } from "../../../core/base-model.js"; 
// import { User } from "../../authentication/entities/user.entity.js"; 
// import { Course } from "./courses.entity.js"; 

// @Entity("course_likes")
// export class CourseLike extends BaseModel {
//     @Column() 
//     userId!: number; 
    
//     @Column() 
//     courseId!: number; 
    
//     @Column({ default: false }) 
//     isLiked!: boolean; 
    
//     // @ManyToOne(() => User, user => user.courseLikes) 
//     // @JoinColumn({ name: "userId" }) 
//     // user!: Relation<User>;

//     @ManyToOne(() => Course, course => course.likes)
//     @JoinColumn({ name: "courseId" })
//     course!: Relation<Course>;
// }