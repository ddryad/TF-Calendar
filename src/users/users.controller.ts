import { Controller, Body, Post, Patch, Param, Get, Session, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-users.dto'
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { serialize } from 'v8';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';


@UseInterceptors(CurrentUserInterceptor)
@Controller('users')
export class UsersController {

    constructor(private service : UsersService, private authService : AuthService) {}

    @Post("/create")
    async createUser(@Body() body : CreateUserDto, @Session() session : any){
        // console.log(body)
        const user = await this.authService.signup(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post("/signin")
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @UseGuards(AuthGuard)
    @Post("/signout")
    async signout(@Session() session : any){
        session.userId = null
    }

    @UseGuards(AuthGuard)
    @Get("/whoami")
    async whoAmI(@CurrentUser() user : User){
        return user;
        // return session.id == null ? "No one logged in" : this.service.findone(session.id)
    }

    // @UseInterceptors(ClassSerializerInterceptor)
  
    @UseGuards(AdminGuard)
    @Serialize(UserDto)
    @Get("/:id")
    async getOne(@Param('id') id : number){
        return this.service.findone(id)
    }

    @UseGuards(AuthGuard)
    @Patch('/:id')
    updateUser(@Param('id') id : string, @Body() body : UpdateUserDto){
        return this.service.updateUser(parseInt(id), body)
    }



}
