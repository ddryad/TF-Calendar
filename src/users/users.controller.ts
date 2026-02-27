import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Serialize } from 'src/interceptors/SerializeInterceptor';
import { UserDTO } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService, private authService: AuthService) { }

    @Post("/signup")
    async signUp(@Body() body: CreateUserDTO, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post("/signin")
    async signIn(@Body() body: CreateUserDTO, @Session() session: any) {

        const user = await this.authService.signIn(body.email, body.password)
        session.userId = user.id;

        return user
    }

    @Post("/signout")
    logout(@Session() session: any) {
        session.userId = null
    }

    @Get("/whoami")
    async whoami(@Session() session: any) {
        return this.authService.whoAmI(session.userId)
    }

    @Get("")
    getAllUsers() {
        return this.userService.findAll()
    }

    @Serialize(UserDTO)
    @Get("/:id")
    findOneUser(@Param("id") id: number) {

        return this.userService.findOneUser(id)
    }

    @Delete("/:id")
    deleteOne(@Param("id") id: number) {

        return this.userService.deleteOneUser(id)
    }

    @Patch("/:id")
    updateOne(@Param("id") id: number, @Body() updatedUserDTO: CreateUserDTO) {
        console.log(updatedUserDTO)
        return this.userService.updateUser(id, updatedUserDTO)
    }

}
