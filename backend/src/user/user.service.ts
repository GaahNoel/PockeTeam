import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { FindUserDto } from './dtos/find-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private UserModel: SoftDeleteModel<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const findUser = await this.UserModel.find({
      username: createUserDto.username,
    });
    if (findUser)
      throw new InternalServerErrorException('Username já existente !');
    const createdUser = new this.UserModel(createUserDto);
    return createdUser.save();
  }

  async findByID(id: number): Promise<User> {
    const selectedUser = await this.UserModel.findById(id);
    return selectedUser;
  }

  async search(FindUserDTO: FindUserDto): Promise<User> {
    console.log('selectedUser');
    const selectedUser = await this.UserModel.findOne(FindUserDTO).populate(
      {
        path:'favoriteTeam',
        populate:{
          path:'pokemon',
          model:'Pokemon',
        }
      }
    );
    
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
    }).select('username');
    return selectedUser;
  }
}
