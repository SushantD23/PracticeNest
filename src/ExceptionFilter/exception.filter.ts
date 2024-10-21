import { ArgumentsHost, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { IdException } from "./id.exception";
import { error } from "console";
import { Response } from "express";

export class IdExceptionFilter implements ExceptionFilter{
    catch(exception: IdException, host: ArgumentsHost){
        const body = {
            message: exception.message,
            error: "Id error"
        };

        const cntx = host.switchToHttp()
        const res = cntx.getResponse<Response>()

        res.status(HttpStatus.BAD_REQUEST).json(body);
    }
}