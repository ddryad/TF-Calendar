import { CreateActiviteDto } from './create-activite.dto';
import { IsNumber, IsArray } from 'class-validator';

export class CreateActiviteGroupeDto extends CreateActiviteDto {
    @IsNumber()
    groupeId: number;

    @IsArray()
    @IsNumber({}, { each: true })
    participantIds: number[];
}
