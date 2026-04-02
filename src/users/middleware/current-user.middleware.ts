import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserMiddleWare implements NestMiddleware{

    constructor(private userService : UsersService) {}

    async use(req: any, res: any, next: (error?: any) => void) {

        const { userId } = req.session;

        console.log(userId)

        if(userId){
            const user = await this.userService.findOneUser(userId);
            req.session.currentUser = user;
        }
        
        next()
    }
}