import { Controller, Body, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly todoService: UserService) {}

  @Post()
  async registerNewUser(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    const generatedToken = await this.todoService.register(username, password);
    return { token: generatedToken };
  }

  @Get()
  async loginUser(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    const generatedToken = await this.todoService.login(username, password);
    return { token: generatedToken };
  }
}
