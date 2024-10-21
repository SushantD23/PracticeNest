import { HttpException, Injectable } from '@nestjs/common';
import { userService } from '../User Module/users.service';
import { loginUserDTO } from '../User Module/DTO/login-user.dto';
import { createUserDto } from '../User Module/DTO/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstant } from './Auth.constants';

@Injectable()
export class authService {
  constructor(
    private userService: userService,
    private jwtService: JwtService,
  ) {}

  //   Checking if user exists before creating it...
  async CheckUserExistence(createdUser: createUserDto) {
    const user = await this.userService.userExists(
      createdUser.username,
      createdUser.email,
    );

    if (!user) {
      const hashedpass = await this.hashpassword(createdUser.password);
      return await this.userService.createUser({
        ...createdUser,
        password: hashedpass,
      });
    } else {
      return 'User already exists with either same email or username';
    }
  }

  // Syncining and validating the username and password from DB...
  async validateUser(loginDto: loginUserDTO) {
    const { username, password } = loginDto;

    try {
      const user = await this.userService.logInValidation(username);

      if (user) {
        const isPasswordValid = await this.comparePassword(
          password,
          user.password,
        );

        if (isPasswordValid) {
          const token = this.generateToken(user);
          console.log("Generated token", token);
          return { access_token: token };
        } else {
          return 'Password mismatch';
        }
      } else {
      }
    } catch (err) {
      return err;
    }
  }

  //   async login()

  //   Syncining all the user form the DB...
  async allUsers() {
    return this.userService.allUsers();
  }

  // Searching the user for the specific user_id...
  async findById(user_id: number) {
    return this.userService.findUser(user_id);
  }

  //   Deleting a user from the exisiting DB...
  async deleteUser(user_id: number) {
    return await this.userService.deleteUser(user_id);
  }

  // Encrypting the password...
  private async hashpassword(plainPassword: string) {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
  }

  // Comparing the password...
  private async comparePassword(
    enteredPassword: string,
    hashedpassword: string,
  ) {
    return await bcrypt.compare(enteredPassword, hashedpassword);
  }

  // Generating a JWT token...
  private generateToken(user) {
    const payload = { sub: user.user_id, name: user.fullname };
    return this.jwtService.sign(payload, {secret: jwtConstant.secret});
  }

//   private validateToken(payload: any) {
//     const secret = jwtConstant.secret
//     try {
//       this.jwtService.verify(token, secret);
//     } catch (err) {
//       return err;
//     }
//   }
}
