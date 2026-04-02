import { Injectable, BadRequestException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
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

        const [salt, storedHash] = user.passwordHash.split('.')

        const hash = (await scrypt(password, salt, 32)) as Buffer

        if (hash.toString('hex') != storedHash){
            throw new BadRequestException('wrong password')
        }
        return user

    }

    async signup(userDTO : CreateUserDTO) {
        
        const user = await this.UsersService.findByEmail(userDTO.email)

        if (user){
            throw new BadRequestException("user already exist")
        }
        
        const salt = randomBytes(8).toString('hex')
        const hash = (await scrypt(userDTO.password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex')

        return this.UsersService.createUser({
            email : userDTO.email,
            password : result,
            nomComplet : userDTO.nomComplet,
            omnivoxDA : userDTO.omnivoxDA,
            omnivoxPasswordHash : userDTO.password,
            calendrierId : userDTO.calendrierId
        })

    }

    async whoami(session : any){
        return session.id == null ? "No one logged in" : this.UsersService.findOneUser(session.id)
    }

}
