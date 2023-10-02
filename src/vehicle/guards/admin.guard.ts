import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ErrorHelper } from 'src/helpers/error.helper';
import { Roles } from 'src/helpers/roles.helper';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authorization = request.headers.authorization;

      if (!authorization && !authorization?.startsWith('Bearer ')) {
        throw new UnauthorizedException(ErrorHelper.UNAUTHORIZED);
      }

      const accessToken = authorization.split(' ')[1];

      const payload = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_SECRET_KEY,
      });
      if (!payload.role || !(payload.role == Roles.ADMIN)) {
        throw new ForbiddenException(ErrorHelper.FORBIDDEN);
      }
      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException(
          ErrorHelper.UNAUTHORIZED,
          error.message,
        );
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException(
          ErrorHelper.UNAUTHORIZED,
          error.message,
        );
      }
      throw new UnauthorizedException(ErrorHelper.UNAUTHORIZED);
    }
  }
}
