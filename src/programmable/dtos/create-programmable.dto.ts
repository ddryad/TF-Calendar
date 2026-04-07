import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProgrammableDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  dateDepart: Date;
}
