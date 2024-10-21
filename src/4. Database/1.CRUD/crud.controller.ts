import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { crudService } from './crud.service';
import { crudModel } from './crud.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './file.upload';

@Controller('testdb')
export class crudController {
  constructor(private readonly crudService: crudService) {}

  @Post()
  async createTest(@Body() body: crudModel) {
    console.log(body);
    return await this.crudService.createdTest(body);
  }
  @Get('all')
  async showAll() {
    return await this.crudService.showAll();
  }

  @Get('/one:id')
  async ShowOne(@Param('id') tId: number) {
    return await this.crudService.ShowSpec(tId);
  }

  @Patch(':id')
  async updateTest(
    @Param('id') tId: number,
    @Body() updateData: Partial<crudModel>,
  ) {
    return await this.crudService.updateTest(tId, updateData);
  }

  @Delete(':id')
  async Delete(@Param('id') tId: number) {
    return await this.crudService.delete(tId);
  }

  @Get('/age')
  async findByAge(@Query('tAge') tAge: number) {
    console.log('HEREEEE', tAge);

    return await this.crudService.findByAge(tAge);
  }

  @Get('/filter')
  async filter(@Query('tAge') tAge: number) {
    return this.crudService.logOpt(tAge);
  }

  @Delete('col/:id')
  async delAColumn(@Param('id') tId: number) {
    return this.crudService.delAColumn(tId);
  }

  @Post('profile/:id')
  @UseInterceptors(FileInterceptor('Profile', multerConfig))
  uploadFile(
    @Param('id') tId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(tId);
    console.log(file);
    const filePath = `${file.filename}`;
    return this.crudService.updateProfile(tId, filePath);
  }

  @Put('/jsonb/:id')
  async usingjsonB(@Param('id') tId: number, @Body() jsonb: object) {
    return await this.crudService.usingjsonB(tId, jsonb);
  }

  @Get('/filterjson')
  async filterjson() {
    return await this.crudService.filterjson();
  }
}
