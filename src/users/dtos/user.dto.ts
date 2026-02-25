import { Expose } from "class-transformer";


export class UserDTO{


    @Expose()
    email : string

    @Expose()
    id:number

}