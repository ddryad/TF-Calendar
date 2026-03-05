import { CanActivate, ExecutionContext, Injectable, UseGuards, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";

export class AdminGuard implements CanActivate{

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const session = context.switchToHttp().getRequest().session
        console.log(session)
        if (!session.currentUser) return false

        return session.currentUser.admin == true
        
    }
}