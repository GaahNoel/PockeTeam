import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('list')
  index(): Promise<User[]> {
    return this.userService.index();
  }

  @Post('create')
  create(@Body() createUserDTO: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDTO);
  }

  @Post('login')
  login(@Body() loginUser: LoginUserDto): Promise<User> {
    const selectedUser = this.userService.login(loginUser);
    return selectedUser;
  }
}
