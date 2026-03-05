import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { UserDto } from "../dtos/user.dto";
import { plainToClass } from "class-transformer";
import { Session } from "@nestjs/common";
import { UsersService } from "../users.service";


@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{

    constructor (private userService : UsersService) {}


    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        
        const request = context.switchToHttp().getRequest();
        const userId =  request.session.userid;

        // if (!userId){
        //     throw new NotFoundException;
        // }

        const user = this.userService.findone(userId)
        
        request.currentUser = user;

        return next.handle();

    
    }

}