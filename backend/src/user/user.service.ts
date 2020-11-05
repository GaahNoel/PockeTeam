import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.UserModel(createUserDto);
    return createdUser.save();
  }

  async findByID(id: number): Promise<User> {
    const selectedUser = this.UserModel.findById(id);
    return selectedUser;
  }

  async index(): Promise<User[]> {
    const selectedUser = this.UserModel.find();
    return selectedUser;
  }

  async login(loginUser: LoginUserDto): Promise<User> {
    const { login, password } = loginUser;
    const selectedUser = this.UserModel.findOne({
      login,
      password,
    }).select('username');
    return selectedUser;
  }
}
