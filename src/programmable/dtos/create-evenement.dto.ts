import { IsInt, Min } from 'class-validator';
import { CreateProgrammableDto } from './create-programmable.dto';

export class CreateEvenementDto extends CreateProgrammableDto {
  @IsInt()
  @Min(0)
  dureeJours: number;
}
