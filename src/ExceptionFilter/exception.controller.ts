import { Controller, Get, HttpException, Param, ParseIntPipe, UseFilters } from "@nestjs/common";
import { IdException } from "./id.exception";
import { IdExceptionFilter } from "./exception.filter";


@Controller('excep')
export class ExceptionController {

    @Get(':id')
    excep(@Param('id', ParseIntPipe) id: number){
        if(id < 0){
            throw new HttpException("Invalid", 300);
        }

        else{
            return {
                "status": "All Ok", 
            }
        }
    }

    @Get('/custom/:id')
    @UseFilters(IdExceptionFilter)
    custom(@Param('id') id: number){
        if(id<0){
        throw new IdException()
        }
        else{
            return {
                'custom': "All Okay",
            }
        }
    }
}