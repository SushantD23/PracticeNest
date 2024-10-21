import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { userModel } from './Database/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';


@Injectable()
export class userService {
  constructor(
    @InjectModel(userModel) private userM: typeof userModel
  ) {}

  // Check if the user with same usernmae or email id exist...
  async userExists(username: string, email: string) {
    return await this.userM.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });
  }

  async logInValidation(username: string){
    return await this.userM.findOne({
      where:{ username },
      rejectOnEmpty: new HttpException("Invalid username", HttpStatus.NOT_FOUND),
    })
  }
  // Create a new user...
  async createUser(createdUser){
    return await this.userM.create(createdUser);
  }

  // Return all exisiting users...
  async allUsers() {
    return await this.userM.findAll({
      attributes: ['user_id', 'fullname'],
    });
  }

  
  async deleteUser(user_id) {
    return await this.userM.destroy({
      where: { user_id },
    });
  }

  // Find the user by ID...
  async findUser(user_id: number) {
    return await this.userM.findOne({
      where: { user_id },
    });
  }
}