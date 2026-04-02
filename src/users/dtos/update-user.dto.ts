import { IsEmail, IsOptional, IsString, IsNumber } from "class-validator";

export class UpdateUserDTO{

    @IsEmail()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    password?: string

    @IsString()
    @IsOptional()
    nomComplet?: string

    @IsString()
    @IsOptional()
    omnivoxDA?: string

    @IsString()
    @IsOptional()
    omnivoxPassword?: string

    @IsNumber()
    @IsOptional()
    calendrierId?: number
}
