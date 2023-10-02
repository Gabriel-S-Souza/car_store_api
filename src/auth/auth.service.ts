import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { ErrorHelper } from 'src/helpers/error.helper';
import { LoginDto } from './dtos/login.dto';
import { Roles } from 'src/helpers/roles.helper';
import { JwtService } from '@nestjs/jwt';

const DUPLICATED_KEY_ERROR_CODE = '23505';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto): Promise<any> {
    try {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
      return newUser.toResponse({ role: Roles.ADMIN });
    } catch (error) {
      if (error.code === DUPLICATED_KEY_ERROR_CODE) {
        throw new ConflictException(ErrorHelper.EMAIL_ALREADY_IN_USE);
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException(ErrorHelper.INVALID_CREDENTIALS);
    }
    const isPasswordValid = this.isPasswordsEquals(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(ErrorHelper.INVALID_PASSWORD);
    }

    const { accessToken, refreshToken } = this.generateTokens(user);

    return {
      accessToken,
      refreshToken,
      user: user.toResponse({ role: Roles.ADMIN }),
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decodedToken = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
      });

      if (decodedToken && decodedToken.isRefreshToken) {
        const user = await this.getUser({ where: { id: decodedToken.sub } });

        if (user) {
          const { accessToken, refreshToken } = this.generateTokens(user);

          return {
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
        }
      }

      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: ErrorHelper.INVALID_REFRESH_TOKEN,
        },
        HttpStatus.UNAUTHORIZED,
      );
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: error.message,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw error;
    }
  }

  async deleteUser(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  private async validateUser(loginDto: LoginDto) {
    try {
      return await this.getUser({ where: { email: loginDto.email } });
    } catch (error) {
      return null;
    }
  }

  private generateTokens(user: UserEntity) {
    const payload = {
      username: user.email,
      sub: user.id,
      role: Roles.ADMIN,
    };
    const payloadRefresh = {
      sub: user.id,
      roles: Roles.ADMIN,
      isRefreshToken: true,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });
    const refreshToken = this.jwtService.sign(payloadRefresh, {
      secret: process.env.JWT_REFRESH_SECRET_KEY,
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  private async getUser(options: FindOneOptions<UserEntity>) {
    try {
      return await this.userRepository.findOneOrFail(options);
    } catch (error) {
      throw error;
    }
  }

  private isPasswordsEquals(password: string, password1: string) {
    return password === password1;
  }
}
