import {  UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserDto } from "src/users/dtos/user.dto";
import { plainToClass } from "class-transformer";

interface ClassConstructor {
    new (...args : any[]) : {};
}

export function Serialize(dto : any) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{

    constructor (private dto : any) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // before the request is handle by req handler
        // console.log('before...', context);

        return next.handle().pipe(
            map((data : any) => {
                // console.log('after...', data)
                return plainToClass(UserDto, data, {
                    excludeExtraneousValues : true
                })

            })
        );

    }

}