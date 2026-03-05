import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Serialize } from 'src/interceptors/SerializeInterceptor';
import { UserDTO } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { CurrentUserInterceptor } from 'src/interceptors/CurrentUserInterceptor';
import { AllowLoggedIn, AuthGuard } from 'src/guards/auth-guard';
import { AdminGuard } from 'src/guards/admin-guard';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService, private authService: AuthService) { }

    @Post("/signup")
    async signUp(@Body() body: CreateUserDTO, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password)
        session.userId = user.id
        return user
    }

    @AllowLoggedIn()
    @Get("/message")
    async getMessage(){

        return "ABCDEF"
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
    whoami(@CurrentUser() user : User) {
        console.log(user)
        return user
    }

    @UseGuards(AdminGuard)
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
