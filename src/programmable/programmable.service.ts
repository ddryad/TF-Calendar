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
  ) {}

  async findAll(): Promise<Programmable[]> {
    return this.programmableRepo.find();
  }

  async findOne(id: string): Promise<Programmable> {
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
}
