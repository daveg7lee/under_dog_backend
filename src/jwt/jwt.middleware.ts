import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if ('authorization' in req.headers) {
      const token = req.headers['authorization'].split(' ')[1];
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        try {
          const { success, user } = await this.userService.findById(
            Number(decoded.id),
          );
          if (success) {
            req['user'] = user;
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    next();
  }
}
