import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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

    async createUser(userDTO: CreateUserDTO) {
        const user = this.usersRepository.create(
            { email: userDTO.email, 
                password: userDTO.password, 
                nomComplet: userDTO.nomComplet, 
                omnivoxDA: userDTO.omnivoxDA,
                calendrierId : userDTO.calendrierId,
                omnivoxPasswordHash : userDTO.omnivoxPasswordHash
            })
        await this.usersRepository.save(user)
        return user
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOneBy({ email: email })
        return user
    }

    async findOneUser(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } })
        if (!user) {
            throw new NotFoundException(`Utilisateur avec id ${id} est inexistant`)
        }
        return user
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
