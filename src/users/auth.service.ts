import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { scrypt as _script, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_script)

@Injectable()
export class AuthService {

    constructor(private userService: UsersService) { }

    async signUp(email: string, password: string) {

        const user = await this.userService.findByEmail(email)

        if (user) {
            throw new NotAcceptableException("email already exists.")
        }

        const salt = randomBytes(8).toString("hex")

        const passwordHash = ((await scrypt(password, salt, 32)) as Buffer).toString("hex")

        const hash_salt = salt + "." + passwordHash

        return this.userService.createUser({ email: email, password: hash_salt })

    }

    async signIn(email: string, password: string) {

        const user = await this.userService.findByEmail(email)
        if (!user) {
            throw new NotFoundException(`User avec email ${email} n'existe pas`)
        }

        const [salt, storedHash] = user.password.split(".")
        password = ((await scrypt(password, salt, 32)) as Buffer).toString('hex')

        if (password == storedHash) return user

        throw new NotAcceptableException("Failed to Login")

    }

    async whoAmI(sessionId: number | null) {

        return sessionId == null ? "Logged Out" : this.userService.findOneUser(sessionId)
    }

}
