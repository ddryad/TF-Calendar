import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService){}

    @Post("/signup")
    createUser(@Body() user : CreateUserDTO){
        this.userService.createUser(user)
        console.log(user)
    }

    @Get("/getAll")
    getAllUsers(){
        return this.userService.findAll()
    }

    @Get("/:id")
    getOne(@Param("id") id : number){

        return this.userService.findOneUser(id)
    }

    @Delete("/:id")
    deleteOne(@Param("id") id : number){

        return this.userService.deleteOneUser(id)
    }

    @Patch("/:id")
    updateOne(@Param("id") id : number, @Body() updatedUserDTO : CreateUserDTO){
        console.log(updatedUserDTO)
        return this.userService.updateUser(id, updatedUserDTO)
    }

}
