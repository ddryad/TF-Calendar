import { CourDto } from './cour.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class OmnivoxService {


    private readonly omnivoxApiUrl = 'http://127.0.0.1:8000';

    constructor(private httpService: HttpService) {}

    async getCours(da : number, password : string): Promise<CourDto[]>{
        try {
            const response = await firstValueFrom(
                this.httpService.post(`${this.omnivoxApiUrl}/classes`, {
                    da: String(da),
                    password: password,
                })
            );
            return response.data;
        } catch (error) {
            console.log('ERROR:', error);
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                const detail = error.response?.data?.detail || 'Unknown error';

                if (status === 401) {
                throw new UnauthorizedException('Invalid Omnivox credentials');
                }

                throw new HttpException(
                `Omnivox service error: ${detail}`,
                status || HttpStatus.INTERNAL_SERVER_ERROR
                );
            }

            // fallback if it's not an Axios error
            throw new HttpException(
                'Unexpected error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

}
