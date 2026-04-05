import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programmable } from './entities/programmable.entity';
import { Evenement } from './entities/evenement.entity';
import { Activite } from './entities/activite.entity';
import { CreateEvenementDto } from './dtos/create-evenement.dto';
import { CreateActiviteDto } from './dtos/create-activite.dto';

@Injectable()
export class ProgrammableService {
  constructor(
    @InjectRepository(Programmable)
    private readonly programmableRepo: Repository<Programmable>,
    @InjectRepository(Evenement)
    private readonly evenementRepo: Repository<Evenement>,
    @InjectRepository(Activite)
    private readonly activiteRepo: Repository<Activite>
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

  async createEvenement(createDto: CreateEvenementDto): Promise<Evenement> {
    const evenement = this.evenementRepo.create(createDto);
    return this.evenementRepo.save(evenement);
  }

  async createActivite(createDto: CreateActiviteDto): Promise<Activite> {
    const activite = this.activiteRepo.create(createDto);
    return this.activiteRepo.save(activite);
  }

  async updateEvenement(id: number, attrs: Partial<CreateEvenementDto>): Promise<Evenement> {
    let evenement = await this.evenementRepo.findOne({ where: { id } })
    if (!evenement) {
      throw new NotFoundException(`Evenement avec id ${id} non trouve`);
    }
    evenement = Object.assign(evenement, attrs)
    return this.evenementRepo.save(evenement)
  }

  async updateActivite(id: number, attrs: Partial<CreateActiviteDto>): Promise<Activite> {
    let activite = await this.activiteRepo.findOne({ where: { id } })
    if (!activite) {
      throw new NotFoundException(`Activite avec id ${id} non trouve`);
    }
    activite = Object.assign(activite, attrs)
    return this.activiteRepo.save(activite)
  }

  async deleteProgrammable(id: number): Promise<Programmable> {
    const programmable = await this.findOne(id)
    return this.programmableRepo.remove(programmable)
  }
}
