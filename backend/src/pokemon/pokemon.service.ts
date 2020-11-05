import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { Model } from 'mongoose';
import { Pokemon } from './schemas/pokemon.schema';
import { PokemonList } from './schemas/list-pokemon.schema';
import { CreatePokemonDto } from './dtos/create-pokemon.dto';
import { UpdatePokemonListDto } from './dtos/update-pokemon-list.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private PokemonModel: Model<Pokemon>,

    @InjectModel(PokemonList.name)
    private PokemonListModel: SoftDeleteModel<PokemonList>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    const createdUser = new this.PokemonModel(createPokemonDto);
    return createdUser.save();
  }

  async updateList(
    updatePokemonListDto: UpdatePokemonListDto,
  ): Promise<PokemonList> {
    const updatedList = new this.PokemonListModel({
      list: updatePokemonListDto,
    });
    return updatedList.save();
  }

  async findByID(id: number): Promise<Pokemon> {
    const selectedUser = this.PokemonModel.findById(id);
    return selectedUser;
  }

  async allPokemons(): Promise<PokemonList> {
    const allPokemons = this.PokemonListModel.find()
      .select('list')
      .findOne();
    return allPokemons;
  }

  async index(): Promise<Pokemon[]> {
    const selectedPokemon = this.PokemonModel.find();
    return selectedPokemon;
  }

  async delete(id: string): Promise<Pokemon> {
    const selectedPokemon = this.PokemonModel.findByIdAndDelete(id);
    return selectedPokemon;
  }
}
