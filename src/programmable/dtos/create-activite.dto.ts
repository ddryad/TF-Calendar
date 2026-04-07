import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { CreateProgrammableDto } from './create-programmable.dto';
import { NiveauPriorite } from '../entities/activite.entity';

export class CreateActiviteDto extends CreateProgrammableDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  dureeHeures: number;

  @IsOptional()
  @IsEnum(NiveauPriorite)
  priorite: NiveauPriorite;
}
