import { Exclude } from "class-transformer";
import { AfterInsert, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id : number
    
    @Column()
    email : string
    
    @Exclude()
    @Column()
    passwordHash : string

    @Column({ nullable: true })
    nomComplet: string

    @Column({ nullable: true })
    omnivoxDA: number

    @Exclude()
    @Column({ nullable: true })
    omnivoxPasswordHash: string

    @Column({ nullable: true })
    calendrierId: number

    @ManyToMany(() => User)
    @JoinTable()
    friends: User[]

    @AfterInsert()
    verify(){
        console.log(`User with id : ${this.id}, email : ${this.email} has used password : ${this.passwordHash}`)
    }

    
}