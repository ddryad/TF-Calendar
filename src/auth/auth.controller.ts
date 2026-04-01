import { Body, Controller, Post, Session } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService) {}

    
    @Post("/signup")
    async createUser(@Body() body : CreateUserDTO, @Session() session : any){
        // console.log(body)
        const user = await this.authService.signup(body)
        session.userId = user.id
        return user
    }

    @Post("/signin")
    async signin(@Body() body: CreateUserDTO, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }
}
