import { CourDto } from './cour.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class OmnivoxService {


    private readonly omnivoxApiUrl = 'http://localhost:8000';

    constructor(private httpService: HttpService) {}

    async getCours(da : number, password : string): Promise<CourDto[]>{
        try {
            const response = await firstValueFrom(
                this.httpService.post(`${this.omnivoxApiUrl}/classes`, {
                    da: da,
                    password: password,
                })
            );
            return response.data;
        } catch (error : any) {
            const status = error.response?.status;
            const detail = error.response?.data?.detail;
 
            if (status === 401) {
                throw new UnauthorizedException('Invalid Omnivox credentials');
            }
 
            throw new HttpException(
                `Omnivox service error: ${detail}`,
                status
            );
        }
    }

}
