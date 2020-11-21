import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserDto } from './dtos/find-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private emailService: EmailService,
  ) {}

  @Get('list')
  index(): Promise<User[]> {
    return this.userService.index();
  }

  @Post('create')
  async create(@Body() createUserDTO: CreateUserDto): Promise<User> {
    const createdUser = await this.userService.create(createUserDTO);
    const { id } = await this.emailService.createEmailToken(
      createUserDTO.email,
    );
    await this.emailService.sendEmailVerification(id);
    return createdUser;
  }

  @Post('search')
  search(@Body() findUserDto: FindUserDto): Promise<User> {
    return this.userService.search(findUserDto);
  }

  @Post('login')
  login(@Body() loginUser: LoginUserDto): Promise<User> {
    const selectedUser = this.userService.login(loginUser);
    return selectedUser;
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const selectedUser = this.userService.update(id, updateUserDto);
    return selectedUser;
  }
}
