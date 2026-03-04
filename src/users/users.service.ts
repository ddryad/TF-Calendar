import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo : Repository<User>) {} 

    create (email : string, password : string) {
        const user = this.repo.create({email,password});
        return this.repo.save(user)

        // return this.repo.save({email,password})
    }

    async findone(id : number){
        const user = await this.repo.findOneBy({id})

        if( !user ) throw new NotFoundException("user not found")

        return user

    }

    // async findPassword(email : string){
    //     const user = this.findByEmail(email)
        

    // }

    async findByEmail(email : string){
        const user = this.repo.findOneBy({email : email})

        if( user ) return user

        throw new NotFoundException("user not found")

    }

    

    findAllUsers(){

    }

    async updateUser(id : number, attrs : Partial<User>) {
        let user = await this.repo.findOne({where : {id : id}});

        if(!user) {
            throw new NotFoundException()
        }

        user = Object.assign(user, attrs)


        return this.repo.save(user)

        

    }

}
