import { IsEmail, isEmail, IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email : string;

    @IsString()
    @IsNotEmpty()
    password : string;

}