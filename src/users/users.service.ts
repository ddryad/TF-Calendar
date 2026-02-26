import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
import { NotFoundError } from 'rxjs';
import e from 'express';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findAll() {
        return await this.usersRepository.find()
    }

    createUser(userDTO: CreateUserDTO) {

        const user = this.usersRepository.create({ email: userDTO.email, password: userDTO.password })

        this.usersRepository.save(user)

        return user

        //await this.usersRepository.save(userDTO)

    }

    async findByEmail(email: string) {

        const user = await this.usersRepository.findOneBy({ email: email })

        return user ? user : new NotFoundException(`User avec email ${email} n'existe pas`)

    }

    async findOneUser(id: number) {

        const user = await this.usersRepository.findOne({ where: { id: id } })

        return user ? user : new NotFoundException(`Utilisateur avec id ${id} est inexistant`)

    }

    async deleteOneUser(id: number) {

        let user = await this.usersRepository.findOneBy({ id: id })

        if (!user) throw new NotFoundException(`Utilisateur avec id ${id} est inexistant`)

        this.usersRepository.remove(user)

    }

    async updateUser(id: number, attrs: Partial<User>) {

        let user = await this.usersRepository.findOneBy({ id: id })

        if (!user) {
            throw new NotFoundException(`Utilisateur avec id ${id} est inexistant`)
        }

        user = Object.assign(user, attrs)

        this.usersRepository.save(user)
    }

}
