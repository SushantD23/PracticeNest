import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseFloatPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { pipeService } from './pipe.service';

@Controller('pipe')
export class pipeController {
  constructor(private pipeService: pipeService) {}

  @Get()
  FindAll() {
    return this.pipeService.findAll();
  }

  @Get('/one/:id')
  FindOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    console.log(typeof id);
    return this.pipeService.findOne(id);
  }

  @Get('/uuid/:id')
  uuid(@Param('id', ParseUUIDPipe) uuid: any){
    return 'uuid is valid'
  }

  @Put('/put/:id')
  PutUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body('weight', ParseFloatPipe) wght: number,
  ) {
    console.log(wght);
    return this.pipeService.putUpdate(id, wght);
  }

  @Patch('/patch/:id')
  PatchUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body('Ismale', ParseBoolPipe) ismale: boolean,
  ) {
    console.log(typeof ismale, typeof id);
    return this.pipeService.patchUpdate(id, ismale);
  }


  @Post('/create')
  create(@Body('age', new DefaultValuePipe(18)) age: number){
    return this.pipeService.create({"age": age});
  }
}
