import { Controller, Get } from "@nestjs/common";


@Controller('prac')
export class pracController{
    @Get()
    prac(){
        return 'Testing middleware'
    }
}