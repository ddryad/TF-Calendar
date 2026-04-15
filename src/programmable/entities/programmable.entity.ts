import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import type { Calendrier } from '../../calendrier/calendrier.entity';

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

  @Column()
  userId: number;

  @Column({ nullable: true, type: 'int' })
  calendrierId: number | null;

  @ManyToOne('Calendrier', { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'calendrierId' })
  calendrier: Calendrier;
}