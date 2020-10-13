import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  create(@Body() createUserDTO: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDTO);
  }
}
