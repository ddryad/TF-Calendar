import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programmable } from './entities/programmable.entity';
import { Evenement } from './entities/evenement.entity';
import { Activite } from './entities/activite.entity';
import { ActiviteGroupe } from './entities/activite-groupe.entity';
import { CreateEvenementDto } from './dtos/create-evenement.dto';
import { CreateActiviteDto } from './dtos/create-activite.dto';
import { CreateActiviteGroupeDto } from './dtos/create-activite-groupe.dto';

@Injectable()
export class ProgrammableService {
  constructor(
    @InjectRepository(Programmable)
    private readonly programmableRepo: Repository<Programmable>,
    @InjectRepository(Evenement)
    private readonly evenementRepo: Repository<Evenement>,
    @InjectRepository(Activite)
    private readonly activiteRepo: Repository<Activite>,
    @InjectRepository(ActiviteGroupe)
    private readonly activiteGroupeRepo: Repository<ActiviteGroupe>,
  ) { }

  async findAll(): Promise<Programmable[]> {
    return this.programmableRepo.find();
  }

  async findOne(id: number): Promise<Programmable> {
    const programmable = await this.programmableRepo.findOne({ where: { id } });
    if (!programmable) {
      throw new NotFoundException(`Programmable avec id ${id} non trouve`);
    }
    return programmable;
  }

  async createEvenement(createDto: CreateEvenementDto, userId: number): Promise<Evenement> {
    const evenement = this.evenementRepo.create({ ...createDto, userId });
    return this.evenementRepo.save(evenement);
  }

  async createActivite(createDto: CreateActiviteDto, userId: number): Promise<Activite> {
    const activite = this.activiteRepo.create({ ...createDto, userId });
    return this.activiteRepo.save(activite);
  }

  async findAllByUser(userId: number): Promise<Programmable[]> {
    return this.programmableRepo.find({ where: { userId } });
  }

  async createActiviteGroupe(createDto: CreateActiviteGroupeDto, userId: number): Promise<ActiviteGroupe> {
    const activiteGroupe = this.activiteGroupeRepo.create({ ...createDto, userId });
    return this.activiteGroupeRepo.save(activiteGroupe);
  }

  async updateActiviteGroupe(id: number, updateDto: CreateActiviteGroupeDto): Promise<ActiviteGroupe> {
    const activiteGroupe = await this.activiteGroupeRepo.findOne({ where: { id } });
    if (!activiteGroupe) {
      throw new NotFoundException(`ActiviteGroupe avec id ${id} non trouve`);
    }
    Object.assign(activiteGroupe, updateDto);
    return this.activiteGroupeRepo.save(activiteGroupe);
  }
}
