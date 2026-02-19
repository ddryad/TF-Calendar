import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id : number
    
    @Column()
    email : string

    @Column()
    password : string

    @AfterInsert()
    verify(){
        console.log(`User with id ${this.id} with email ${this.email} has been created.`)
    }
    
    
}