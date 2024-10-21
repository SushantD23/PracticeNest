import { Controller, Get, HttpCode, HttpStatus, Post, Req, Res, Header, Redirect, Param, Query, Headers, Body, Put, Patch, Delete, Inject } from "@nestjs/common";
import { Request, Response } from "express";
import { url } from "inspector";
import { createUserDTO } from "../dto/createUser.dto";
import { testService } from "../provider/test.service";


let USERS = [];


interface RParam{
    id: number,
    name: string, 
}

interface QParam{
    id:number,
    name: string
}

@Controller('test')
export class testController{

    // constructor(private testService: testService) {}
    constructor(@Inject('DB_Id') db: string) {
        console.log(db)
    }
    @Get()
    // @HttpCode(404)
    // @HttpCode(HttpStatus.BAD_REQUEST)
    // @Header('X-Username', 'Sushant')
    // @Redirect('/test/rnltfive', 302)
    readAll(@Req() req: Request, @Res({passthrough: true}) res: Response){
        res.status(250)
        return {
            'Status': 'Readed',
        }

        // const rn = (Math.random() *10 + 1)
        // if(rn < 5){
        //     return {
        //         url: 'test/rnltfive',
        //         statusCode : 302,
        //     }
        // }
        // else {
        //     return {
        //         url: 'test/rngtfive',
        //         statusCode: 305,
        //     }
        // }
    }


    // @Get('/rnltfive')
    // rnlt(){
    //     return 'Number is less than 5';
    // }

    // @Get('/rngtfive')
    // rngt(){
    //     return 'Number is greater than 5';
    // }


    // @Get('/:id/:name')
    // create(@Param() param: RParam){
    //     console.log(param.id, param.name)
    //     return 'Check console';
    // }

    // @Get('/query')
    // created(@Query() query: QParam){
    //     console.log(query.id, query.name)
    //     return 'Check console';
    // }

    // @Get('/headers')
    // header(@Headers('user-agent') header: string){
    //     console.log(header);
    // }

    // @Post('/post')
    // post(@Body() data: string){
    //     console.log(data    

    //     );
    //     return 'Check console'
    // }

    @Get('/users')
    getUser(){
        return USERS;  
    }

    @Get('users/:id')
    getOneUser(@Param("id") id: number){
        // console.log(id);
        return USERS.find((user) => +user.id === +id)
    }

    @Post('/users/create')
    createUser(@Body() createUser: createUserDTO){
        USERS.push(createUser);
        return 'User addded';
    }

    @Put('/update/:id')
    updateUser(@Param('id') id: number, @Body() updateUser: createUserDTO){
        const userIdx = USERS.findIndex((user) => +user.id === +id );
        if(userIdx === -1){
            return 'Failed to update';
        }

        USERS[userIdx] = updateUser;

    }
    @Patch('/updatee/:id')
    updateUserr(@Param('id') id: number, @Body() updateUser: createUserDTO){
        console.log(id)
        const userIdx = USERS.findIndex((user) => +user.id === +id );
        if(userIdx === -1){
            return 'Failed to update';
        }

        USERS[userIdx] = {...USERS[userIdx], ...updateUser};

    }

    @Delete('/users/delete/:id')
    delUser(@Param('id' )id: number){
        USERS =  USERS.filter((user) => +user.id !== +id);
    }


    @Get('user')
    get(){
        // return this.testService.getUser();
    }
}