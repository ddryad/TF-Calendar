import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calendrier } from './calendrier.entity';
import { CreateCalendrierDto } from './dtos/create-calendrier.dto';

@Injectable()
export class CalendrierService {

    constructor(
        @InjectRepository(Calendrier)
        private readonly calendrierRepo: Repository<Calendrier>,
    ) { }

    async create(dto: CreateCalendrierDto, userId: number): Promise<Calendrier> {
        const calendrier = this.calendrierRepo.create({ ...dto, userId });
        return this.calendrierRepo.save(calendrier);
    }

    async findOne(id: number): Promise<Calendrier> {
        const calendrier = await this.calendrierRepo.findOne({ where: { id } });
        if (!calendrier) {
            throw new NotFoundException(`Calendrier avec id ${id} non trouvé`);
        }
        return calendrier;
    }

    // Trouve le calendrier qui appartient à l'utilisateur connecté
    async findByUser(userId: number): Promise<Calendrier | null> {
        return this.calendrierRepo.findOne({ where: { userId } });
    }
}
