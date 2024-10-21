import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { jwtConstant } from './Auth.constants';

@Injectable()
export class authMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);
    console.log("Extracted token", token)

    if(!token){
        throw new UnauthorizedException();
    }
    try{
        const payload = await this.jwtService.verifyAsync(token, {
            secret: jwtConstant.secret
        });
        req['user'] = payload;
        console.log(payload);
        
        next();
    }
    catch(err){
        throw new UnauthorizedException();
    }

  }

  private extractTokenFromHeader(request: Request) {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      return 'No header found';
    }
    const [type, token] = authorizationHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
