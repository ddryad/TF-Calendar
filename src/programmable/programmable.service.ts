import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number, userId?: number): Promise<Programmable> {
    const whereClause = userId ? { id, userId } : { id };
    const programmable = await this.programmableRepo.findOne({ where: whereClause });
    if (!programmable) {
      throw new NotFoundException(`Programmable avec id ${id} non trouve`);
    }
    return programmable;
  }

  async findAllByUser(userId: number): Promise<Programmable[]> {
    return this.programmableRepo.find({ where: { userId } });
  }

  async createEvenement(createDto: CreateEvenementDto, userId: number, calendrierId?: number | null): Promise<Evenement> {
    const evenement = this.evenementRepo.create({ ...createDto, userId, calendrierId: calendrierId ?? null });
    return this.evenementRepo.save(evenement);
  }

  async createActivite(createDto: CreateActiviteDto, userId: number, calendrierId?: number | null): Promise<Activite> {
    await this.checkChevauchement(userId, createDto.dateDepart, createDto.dureeHeures);
    const activite = this.activiteRepo.create({ ...createDto, userId, calendrierId: calendrierId ?? null });
    return this.activiteRepo.save(activite);
  }

  async createActiviteGroupe(createDto: CreateActiviteGroupeDto, userId: number, calendrierId?: number | null): Promise<ActiviteGroupe> {
    await this.checkChevauchement(userId, createDto.dateDepart, createDto.dureeHeures);
    const activiteGroupe = this.activiteGroupeRepo.create({ ...createDto, userId, calendrierId: calendrierId ?? null });
    return this.activiteGroupeRepo.save(activiteGroupe);
  }

  async updateEvenement(id: number, attrs: Partial<CreateEvenementDto>, userId: number): Promise<Evenement> {
    const evenement = await this.evenementRepo.findOne({ where: { id, userId } });
    if (!evenement) {
      throw new NotFoundException(`Evenement avec id ${id} non trouve`);
    }
    Object.assign(evenement, attrs);
    return this.evenementRepo.save(evenement);
  }

  async updateActivite(id: number, attrs: Partial<CreateActiviteDto>, userId: number): Promise<Activite> {
    const activite = await this.activiteRepo.findOne({ where: { id, userId } });
    if (!activite) {
      throw new NotFoundException(`Activite avec id ${id} non trouve`);
    }
    const dateDepart = attrs.dateDepart ?? activite.dateDepart;
    const dureeHeures = attrs.dureeHeures ?? activite.dureeHeures;
    await this.checkChevauchement(activite.userId, dateDepart, dureeHeures, id);
    Object.assign(activite, attrs);
    return this.activiteRepo.save(activite);
  }

  async updateActiviteGroupe(id: number, updateDto: CreateActiviteGroupeDto, userId: number): Promise<ActiviteGroupe> {
    const activiteGroupe = await this.activiteGroupeRepo.findOne({ where: { id, userId } });
    if (!activiteGroupe) {
      throw new NotFoundException(`ActiviteGroupe avec id ${id} non trouve`);
    }
    await this.checkChevauchement(activiteGroupe.userId, updateDto.dateDepart, updateDto.dureeHeures, id);
    Object.assign(activiteGroupe, updateDto);
    return this.activiteGroupeRepo.save(activiteGroupe);
  }

  async deleteProgrammable(id: number, userId: number): Promise<Programmable> {
    const programmable = await this.findOne(id, userId);
    return this.programmableRepo.remove(programmable);
  }

  private async checkChevauchement(
    userId: number,
    dateDepart: Date,
    dureeHeures: number,
    excludeId?: number,
  ): Promise<void> {
    const nouveauTempsDebut = new Date(dateDepart).getTime();
    const nouveauTempsFin = nouveauTempsDebut + dureeHeures * 3_600_000;

    const activites = await this.activiteRepo.find({ where: { userId } });

    for (const a of activites) {
      if (excludeId && a.id === excludeId) continue;

      const tempsActiviteDebut = new Date(a.dateDepart).getTime();
      const tempsActiviteFin = tempsActiviteDebut + a.dureeHeures * 3_600_000;

      if (nouveauTempsDebut < tempsActiviteFin && nouveauTempsFin > tempsActiviteDebut) {
        throw new ConflictException(
          `Chevauchement avec l'activité "${a.nom}" (début : ${a.dateDepart})`,
        );
      }
    }
  }
}
