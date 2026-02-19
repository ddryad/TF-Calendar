import { AfterInsert, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id :number;

    @Column()
    email: string;

    @Column()
    password : string;

    @AfterInsert()
    verify(){
        console.log(`User with id : ${this.id}, email : ${this.email} has used password : ${this.password}`)
    }
    
}