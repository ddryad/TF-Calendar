import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Calendrier {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    userId: number;
}
