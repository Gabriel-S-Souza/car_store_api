import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { ErrorHelper } from 'src/helpers/error.helper';
import { LoginDto } from './dtos/login.dto';

const DUPLICATED_KEY_ERROR_CODE = '23505';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signUp(user: CreateUserDto): Promise<any> {
    try {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      if (error.code === DUPLICATED_KEY_ERROR_CODE) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: ErrorHelper.EMAIL_ALREADY_IN_USE,
          },
          HttpStatus.CONFLICT,
        );
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: ErrorHelper.INVALID_CREDENTIALS,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { username: user.email, sub: user.id };
    return {
      access_token: payload,
    };
  }

  async validateUser(loginDto: LoginDto) {
    let user: UserEntity;
    try {
      user = await this.getUser({ where: { email: loginDto.email } });
    } catch (error) {
      return null;
    }

    const isPasswordValid = this.isEqualsPasswords(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) return null;

    return user;
  }

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getUser(options: FindOneOptions<UserEntity>) {
    try {
      return await this.userRepository.findOneOrFail(options);
    } catch (error) {
      throw error;
    }
  }

  async deleteUsers(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }

  isEqualsPasswords(password: string, password1: string) {
    return password === password1;
  }
}
