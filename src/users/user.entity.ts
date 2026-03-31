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
    password : string

    @Column({ nullable: true })
    nomComplet: string

    @Column({ nullable: true })
    omnivoxDA: string

    @Exclude()
    @Column({ nullable: true })
    omnivoxPasswordHash: string

    @Column({ nullable: true })
    calendrierId: number

    @ManyToMany(() => User)
    @JoinTable()
    friends: User[]
    
}