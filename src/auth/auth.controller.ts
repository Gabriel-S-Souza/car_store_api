import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('')
  async hello() {
    return { message: 'Hello' };
  }

  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }

  @Post('login')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Get('users')
  async getUsers() {
    return this.authService.getUsers();
  }

  @Delete('users/:id')
  async deletUsers(@Param('id') id: number) {
    return this.authService.deleteUsers(id);
  }
}
