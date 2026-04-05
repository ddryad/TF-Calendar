import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
// import { AuthService } from "src/users/auth.service";
import { UsersController } from "src/users/users.controller";


export class AuthGuard implements CanActivate {


    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        return request.session.userId != null;
    }


}