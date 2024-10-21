import { Module } from '@nestjs/common';
import { userModule } from '../User Module/user.module';
import { authController } from './Auth.controller';
import { authService } from './Auth.service';
import { userService } from '../User Module/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './Auth.constants';

@Module({
  imports: [
    userModule,
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '30s' },
    }),
  ],
  providers: [authService],
  controllers: [authController],
  exports: [authService],
})
export class authModule {}
     