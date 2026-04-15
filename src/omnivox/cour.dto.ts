import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import {  CreateProgrammableDto } from 'src/programmable/dtos/create-programmable.dto';
// import { NiveauPriorite } from '../entities/activite.entity';

export class CourDto extends CreateProgrammableDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  heureDebut: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  heureFin: number;

  // @IsOptional()
  // @IsEnum(NiveauPriorite)
  // priorite: NiveauPriorite;
}
