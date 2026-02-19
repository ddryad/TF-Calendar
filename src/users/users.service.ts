import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    
    create(email :string, password : string){
        const user = this.usersRepository.create({email, password});
            return this.usersRepository.save(user);
        
    }
    findOne(){
        
    }
    async findAll() {
        return await this.usersRepository.find()
    }

    async updateUser(id: number, attrs: Partial<User>){
        const user = await this.usersRepository.findOneBy({id : 1});

        if(!user){

            throw new NotFoundException();
        }
    

        Object.assign(user, attrs);
        return this.usersRepository.save(user);

    }

    


}