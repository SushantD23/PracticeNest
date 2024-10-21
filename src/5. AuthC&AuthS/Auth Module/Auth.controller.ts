import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { authService } from './Auth.service';
import { loginUserDTO } from '../User Module/DTO/login-user.dto';
import { createUserDto } from '../User Module/DTO/create-user.dto';
import { MiddlewareBuilder } from '@nestjs/core';
import { authGuard } from './Auth.guard';

@Controller('auth')
export class authController {
  constructor(private authService: authService) {}

  // Creating a new user
  @Post('/user-signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createdUser: createUserDto) {
    return await this.authService.CheckUserExistence(createdUser);
  }

  // Return all users exists
  @Get('/users')
  async allUsers() {
    return await this.authService.allUsers();
  }

  // Return the user by unique user_id
  @Get('/user/:id')
  async ShowUser(@Param('id') user_id: number) {
    return await this.authService.findById(user_id);
  }

  // Delete and return the deleted user...
  @Delete('/user/delete/:id')
  async deleteuser(@Param('id') user_id: number) {
    return await this.authService.deleteUser(user_id);
  }

  @Post('/user-login')
//   @UsePipes(new ValidationPipe({transform: true}))
  async validateUser(@Body() loginDto: loginUserDTO){
    return await this.authService.validateUser(loginDto);
  }

  @Get('profile')
  // @UseGuards(authGuard)
  async protect(@Request() req: Request){
    console.log(req['user']);
    return {"msg": "this is protected"}
  }
}



// Middleware
// authguard
