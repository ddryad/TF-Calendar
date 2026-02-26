import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from "bcrypt"
import { User } from './user.entity';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService) { }

    async signIn(email: string, password: string) {

        const user = await this.userService.findByEmail(email)

        if (user) {
            throw new NotAcceptableException("email already exists.")
        }

        //hash password
        const passwordHash = await bcrypt.hash(password, 6)

        //create new User
        //return User
        return this.userService.createUser({ email: email, password: passwordHash })
    }

    signUp() { }

}
