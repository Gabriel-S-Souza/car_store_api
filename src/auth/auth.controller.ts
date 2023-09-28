import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }

  @Post('login')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Delete('users/:id')
  async deletUsers(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: any) {
    return this.authService.refreshToken(body['refreshToken']);
  }

  //TODO: Remove this endpoint used only for testing
  @Get('users')
  async getUsers() {
    return this.authService.getUsers();
  }
}
