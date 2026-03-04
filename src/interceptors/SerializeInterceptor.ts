import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs";

interface ClassConstructor{
    new (...args : any[]) : {}
}

export function Serialize(dto : ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{

    constructor(private dto : any){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        //console.log("before...", context);

        return next.handle().pipe(
            map((data : any) =>{
                //console.log('after...', data)
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues : true
                })
            })
        )
        
    }

}