import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
import { NotFoundError } from 'rxjs';

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

        this.usersRepository.insert(user)

        //await this.usersRepository.save(userDTO)

    }

    async findOneUser(id : number){

        const user = await this.usersRepository.findOne({where : {id : id}})

        return user ? user : new NotFoundException()

    }

    async deleteOneUser(id : number){

        let user = await this.usersRepository.findOneBy({id : id})

        if(!user) throw new NotFoundException("User Inexistant")

        this.usersRepository.remove(user)

    }

    async updateUser(id : number, attrs : Partial<User>){

        let user = await this.usersRepository.findOneBy({id : id})

        if (!user){
            throw new NotFoundException()
        }

        user = Object.assign(user, attrs)

        this.usersRepository.save(user)
    }

}
