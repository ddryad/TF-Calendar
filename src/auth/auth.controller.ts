import { Body, Controller, Post, Session } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-users.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService) {}

    
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

}
