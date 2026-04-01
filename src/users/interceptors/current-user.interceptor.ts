import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from "@nestjs/common";
import { UsersService } from "../users.service";


@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(private userService: UsersService) {}

    async intercept(context: ExecutionContext, next: CallHandler) {

        const request = context.switchToHttp().getRequest();
        const {userId} = request.session || {};

        if (userId) {
            const user = await this.userService.findOneUser(userId);
            request.currentUser = user;
        }

        return next.handle();
    }
}