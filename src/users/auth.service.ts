import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Injectable()
export class AuthService {

    constructor(private userService : UsersService){}

    async signIn(email : string, password : string){

        //check if email is in database

        const user = await this.userService.findByEmail(email)

        if(user){
            throw new NotAcceptableException("email already exists.")
        }

        //this.userService.createUser()

        //hash password
        //create new User
        //return User
    }

    signUp(){}

}
