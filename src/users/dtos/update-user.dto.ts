<<<<<<< HEAD
import { IsEmail, IsOptional, IsString } from "class-validator";


export class UpdateUserDto{


    @IsEmail()
    @IsOptional()
    email : string

    @IsString()
    @IsOptional()
    password : string

}
=======
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
    omnivoxPasswordHash?: string

    @IsNumber()
    @IsOptional()
    calendrierId?: number
}
>>>>>>> master
