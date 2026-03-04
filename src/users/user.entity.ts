import { Entity, PrimaryGeneratedColumn, Column, AfterInsert } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class    User {
    
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    email : string;
    
    @Exclude()
    @Column()
    password : string;

    @AfterInsert()
    verify(){
        console.log(`User with id : ${this.id}, email : ${this.email} has used password : ${this.password}`)
    }

}