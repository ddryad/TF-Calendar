import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Programmable {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nom: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  dateDepart: Date;
}