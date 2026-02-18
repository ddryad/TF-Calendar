import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findAll() {
        return await this.usersRepository.find()
    }

    async insertUser(userDTO: CreateUserDTO) {

        /* const user = this.usersRepository.create({ email: userDTO.email, password: userDTO.password })

        await this.usersRepository.insert(user) */

        await this.usersRepository.save(userDTO)

    }

}
