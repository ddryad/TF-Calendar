import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {

    constructor(private UsersService : UsersService) {} 

    async signin(email : string, password : string) {
        const user = await this.UsersService.findByEmail(email)

        if (!user){
            throw new BadRequestException("user doesnt exist")
        }

        const [salt, storedHash] = user.password.split('.')

        const hash = (await scrypt(password, salt, 32)) as Buffer

        if (hash.toString('hex') != storedHash){
            throw new BadRequestException('wrong password')
        }
        return user

    }

    

    async signup(email : string, password : string) {
        
        const users = await this.UsersService.findByEmail(email)

        if (users){
            throw new BadRequestException("user already exist")
        }
        
        const salt = randomBytes(8).toString('hex')
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex')

        return this.UsersService.create(email, result)

    }

    async whoami(session : any){
        return session.id == null ? "No one logged in" : this.UsersService.findone(session.id)
    }

}
