import { CanActivate, ExecutionContext } from "@nestjs/common";
// import { AuthService } from "src/users/auth.service";


export class AdminGuard implements CanActivate{

    
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        return request.currentUser.admin;
    }
    

}