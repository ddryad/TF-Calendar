import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Programmable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  dateDepart: Date;

  // Identifiant du propriétaire — injecté depuis la session, jamais du body
  @Column()
  userId: number;
}