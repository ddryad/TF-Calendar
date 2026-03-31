<<<<<<< HEAD
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
=======
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";
>>>>>>> master


export class CreateUserDTO{


    @IsEmail()
    @IsNotEmpty()
    email : string

    @IsString()
    @IsNotEmpty()
    password : string

<<<<<<< HEAD
=======
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
>>>>>>> master
}