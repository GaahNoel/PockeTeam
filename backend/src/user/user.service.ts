import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { FindUserDto } from './dtos/find-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private UserModel: SoftDeleteModel<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { login, username, email } = createUserDto;
    const findLogin = await this.UserModel.find({
      login,
    });
    const findUsername = await this.UserModel.find({
      username,
    });
    const findEmail = await this.UserModel.find({
      email,
    });

    if (findLogin.length !== 0)
      throw new BadRequestException('Login já existe!');
    if (findUsername.length !== 0)
      throw new BadRequestException('Username já existente!');
    if (findEmail.length !== 0)
      throw new BadRequestException('Email já existe!');

    const createdUser = new this.UserModel(createUserDto);
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.UserModel.findByIdAndUpdate(
      id,
      updateUserDto,
      {
        useFindAndModify: false,
      },
    );
    if (!updatedUser)
      throw new InternalServerErrorException('Usuário não encontrado');
    return this.UserModel.findById(id);
  }

  async findByID(id: number): Promise<User> {
    const selectedUser = await this.UserModel.findById(id);
    return selectedUser;
  }

  async search(FindUserDTO: FindUserDto): Promise<User> {
    const userRegex = new RegExp(FindUserDTO.username, 'i');
    const selectedUser = await this.UserModel.findOne(userRegex).populate({
      path: 'favoriteTeam',
      populate: {
        path: 'pokemon',
        model: 'Pokemon',
      },
    });

    return selectedUser;
  }

  async index(): Promise<User[]> {
    const selectedUser = await this.UserModel.find();
    return selectedUser;
  }

  async login(loginUser: LoginUserDto): Promise<User> {
    const { login, password } = loginUser;
    const selectedUser = await this.UserModel.findOne({
      login,
      password,
    }).select('username verified');
    return selectedUser;
  }
}
