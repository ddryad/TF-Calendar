import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService){}

    @Post("/create")
    createUser(@Body() user : CreateUserDTO){
        this.userService.insertUser(user)
        console.log(user)
    }

    @Get("/getAll")
    async getAllUsers(){
        return await this.userService.findAll()
    }


}
