import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstant } from './Auth.constants';

@Injectable()
export class authGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log('Extracted token', token);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstant.secret,
      });

      request['user'] = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Inavlid token');
    }
  }

  private extractTokenFromHeader(request: Request) {
    const authorizationHeader = request.headers.authorization;
    if(!authorizationHeader){
        return "No header found"
    }
    const [type, token] = authorizationHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
