import { NestInterceptor, ExecutionContext, CallHandler,UseInterceptors, Injectable } from "@nestjs/common"
import { Observable, map } from "rxjs"
import { AuthService } from "src/users/auth.service"

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{

    constructor(private auth : AuthService){}

    async intercept(context: ExecutionContext, next: CallHandler<any>):  Promise<Observable<any>> {

        const request = context.switchToHttp().getRequest();
        const id = request.session.userId;

        const user = await this.auth.whoAmI(id)

        request.currentUser = user;

        return next.handle()
    }
}