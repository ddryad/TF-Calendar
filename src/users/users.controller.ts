import {Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import {UpdateUserDto} from './dtos/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService){}

    @Post("/create")
    createUser(@Body() user : CreateUserDTO){
        this.userService.create(user.email, user.password)
       
    }

    @Get("/getAll")
    async getAllUsers(){
        return await this.userService.findAll()
    }

    @Get("/:id")
    async getUser(){
        return await this.userService.findOne()
    }

    @Patch('/:id')
    updateUser(@Param('id') id : string, @Body() body: UpdateUserDto){
        return this.userService.updateUser(parseInt(id), body)
    }


}
