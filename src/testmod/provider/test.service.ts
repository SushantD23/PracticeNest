import { Injectable } from "@nestjs/common";


@Injectable()
export class testService{

    getUser(){
        return 'User';
    }
}