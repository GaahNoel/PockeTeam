import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from './schema/pokemon.schema';
import { CreatePokemonDto } from './dtos/create-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private UserModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    const createdUser = new this.UserModel(createPokemonDto);
    return createdUser.save();
  }

  async findByID(id: number): Promise<Pokemon> {
    const selectedUser = this.UserModel.findById(id);
    return selectedUser;
  }

  async index(): Promise<Pokemon[]> {
    const selectedUser = this.UserModel.find();
    return selectedUser;
  }
}
