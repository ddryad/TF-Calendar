import { Injectable, NotFoundException } from '@nestjs/common';
<<<<<<< HEAD
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
=======
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
>>>>>>> master

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

<<<<<<< HEAD
    
    create(email :string, password : string){
        const user = this.usersRepository.create({email, password});
            return this.usersRepository.save(user);
        
    }
    findOne(){
        
    }
=======
>>>>>>> master
    async findAll() {
        return await this.usersRepository.find()
    }

<<<<<<< HEAD
    async updateUser(id: number, attrs: Partial<User>){
        const user = await this.usersRepository.findOneBy({id : 1});

        if(!user){

            throw new NotFoundException();
        }
    

        Object.assign(user, attrs);
        return this.usersRepository.save(user);

    }

    


}
=======
    async createUser(userDTO: CreateUserDTO) {
        const user = this.usersRepository.create({ email: userDTO.email, password: userDTO.password })
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
>>>>>>> master
