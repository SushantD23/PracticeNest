import { HttpStatus, Injectable, Param } from "@nestjs/common";

let Demo = [
    {
        "id": 1,
        "fname": "Anjaan",
        "lname": "Singh",
        "Ismale": true,
        "age": 23,
        "weight": 54,
    },
    {
        "id": 2,
        "fname": "Kaalia",
        "lname": "Sinha",
        "Ismale": true,
        "age": 21,
        "weight": 12,
    },
    {
        "id": 3,
        "fname": "Chutki",
        "lname": "Tiwari",
        "Ismale": true,
        "age": 19,
        "weight": 45,
    }
]



@Injectable()
export class pipeService {

    findAll(){
        return Demo;
    }

    findOne(id){
        return Demo.find((demo) => demo.id === id);
    }

    putUpdate(id, wght){
        const Idx = Demo.findIndex((demo) => demo.id === id);
        if(Idx === -1){
            return HttpStatus.BAD_REQUEST
        }
        else{
            Demo[Idx] = {...Demo[Idx], weight: wght}
            return Demo[Idx];
        }
    }

    patchUpdate(id, ismale){
        const Idx = Demo.findIndex((demo) => demo.id === id);
        if(Idx === -1){
            return HttpStatus.BAD_REQUEST
        }
        else{
            Demo[Idx] = {...Demo[Idx], Ismale: ismale}
            return Demo[Idx];
        }
    }
    create(age){
        return Demo.push(age);
    }
}