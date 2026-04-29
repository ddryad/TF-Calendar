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
import { ConflitInfo } from './dtos/conflit-info.dto';
import { CreneauDisponible } from './dtos/creneau-disponible.dto';

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

  // on detecte les conflits d'horaire pour un utilisateur et retourne une liste de dto pour afficher quels activites rentre en conflit avec temps de debut et fin
  async getConflits(userId: number): Promise<ConflitInfo[]> {
    const activites = await this.activiteRepo.find({ where: { userId } });
    const conflits: ConflitInfo[] = [];

    for (let i = 0; i < activites.length; i++) {

      for (let j = i + 1; j < activites.length; j++) {

        const a = activites[i];
        const b = activites[j];

        const debutA = new Date(a.dateDepart).getTime();
        const finA = debutA + a.dureeHeures * 3_600_000;

        const debutB = new Date(b.dateDepart).getTime();
        const finB = debutB + b.dureeHeures * 3_600_000;

        if (debutA < finB && finA > debutB) {
          const debutChevauchement = Math.max(debutA, debutB);
          const finChevauchement = Math.min(finA, finB);
          const chevauchementMinutes = (finChevauchement - debutChevauchement) / 60_000;

          const conflit = new ConflitInfo();

          conflit.activiteIdA = a.id;
          conflit.nomA = a.nom;
          conflit.debutA = new Date(debutA);
          conflit.finA = new Date(finA);

          conflit.activiteIdB = b.id;
          conflit.nomB = b.nom;
          conflit.debutB = new Date(debutB);
          conflit.finB = new Date(finB);

          conflit.chevauchementMinutes = chevauchementMinutes;

          conflits.push(conflit);
        }
      }
    }

    return conflits;
  }

  async trouverCreneauxDisponibles(
    userId: number,
    dateDebut: Date,
    dateFin: Date,
    dureeHeures: number,
    maxResultats: number = 5,
  ): Promise<CreneauDisponible[]> {
    const activites = await this.activiteRepo.find({ where: { userId } });

    // transformer la liste d'activites en plages d'occupation {debut,fin},
    const plagesOccupees = activites
      .map(a => ({
        debut: new Date(a.dateDepart).getTime(),
        fin: new Date(a.dateDepart).getTime() + a.dureeHeures * 3_600_000,
      }))
      //on les fitre par rapport a la date de debut et de fin de la requete et on ignore les activites qui sont en dehors de cet intervalle
      .filter(p => p.fin > new Date(dateDebut).getTime() && p.debut < new Date(dateFin).getTime())
      //on les trie par date de debut
      .sort((a, b) => a.debut - b.debut);

    const creneaux: CreneauDisponible[] = [];
    const dureeMilis = dureeHeures * 3_600_000;
    let curseur = new Date(dateDebut).getTime();
    const limiteMax = new Date(dateFin).getTime();

    for (const plage of plagesOccupees) {
      if (creneaux.length >= maxResultats) break;

      // verifier si le trou avant cette plage est assez grand
      if (plage.debut - curseur >= dureeMilis) {
        const creneau = new CreneauDisponible();
        creneau.debut = new Date(curseur);
        creneau.fin = new Date(curseur + dureeMilis);
        creneau.dureeHeures = dureeHeures;
        creneaux.push(creneau);
      }

      // avancer le curseur apres la fin de cette plage occupee
      curseur = Math.max(curseur, plage.fin);
    }

    // verifier le trou apres la derniere plage occupee
    if (creneaux.length < maxResultats && limiteMax - curseur >= dureeMilis) {
      const creneau = new CreneauDisponible();
      creneau.debut = new Date(curseur);
      creneau.fin = new Date(curseur + dureeMilis);
      creneau.dureeHeures = dureeHeures;
      creneaux.push(creneau);
    }

    return creneaux;
  }
  // Si conflit detecte alors retourne l'activite mise a jour et des suggestions de creneaux libres
  async replanifierActivite(
    id: number,
    nouvelleDateDepart: Date,
    userId: number,
  ): Promise<{ activite: Activite; conflitDetecte: boolean; suggestions: CreneauDisponible[] }> {
    const activite = await this.activiteRepo.findOne({ where: { id, userId } });

    if (!activite) {
      throw new NotFoundException(`Activite avec id ${id} non trouvee`);
    }

    // verifier s'il y a un conflit a la nouvelle date
    let conflitDetecte = false;
    try {
      await this.checkChevauchement(userId, nouvelleDateDepart, activite.dureeHeures, id);
    } catch (e) {
      conflitDetecte = true;
    }

    // si conflit on cherche des creneaux libres dans les 7 jours suivants
    let suggestions: CreneauDisponible[] = [];
    if (conflitDetecte) {
      const dateDebut = new Date(nouvelleDateDepart);
      const dateFin = new Date(dateDebut.getTime() + 7 * 24 * 3_600_000);
      suggestions = await this.trouverCreneauxDisponibles(
        userId, dateDebut, dateFin, activite.dureeHeures,
      );
    }

    // si pas de conflit on met a jour la date
    if (!conflitDetecte) {
      activite.dateDepart = nouvelleDateDepart;
      await this.activiteRepo.save(activite);
    }

    return { activite, conflitDetecte, suggestions };
  }
}
