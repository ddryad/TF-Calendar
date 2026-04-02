import { IsEmail, IsOptional, IsString, IsNumber } from "class-validator";

export class UpdateUserDTO{

    @IsEmail()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    passwordHash?: string

    @IsString()
    @IsOptional()
    nomComplet?: string

    @IsString()
    @IsOptional()
    omnivoxDA?: string

    @IsString()
    @IsOptional()
    omnivoxPasswordHash?: string

    @IsNumber()
    @IsOptional()
    calendrierId?: number
}
