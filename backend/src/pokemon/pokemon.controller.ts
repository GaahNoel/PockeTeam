import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { Pokemon } from './schemas/pokemon.schema';
import { CreatePokemonDto } from './dtos/create-pokemon.dto';
import { PokemonService } from './pokemon.service';
import { UpdatePokemonListDto } from './dtos/update-pokemon-list.dto';
import { PokemonList } from './schemas/list-pokemon.schema';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Get('list')
  index(): Promise<Pokemon[]> {
    return this.pokemonService.index();
  }

  @Get('all-pokemons')
  allPokemons(): Promise<PokemonList> {
    return this.pokemonService.allPokemons();
  }

  @Post('create')
  create(@Body() createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    return this.pokemonService.create(createPokemonDto);
  }

  @Post('update-list')
  updateList(
    @Body() updatePokemonListDto: UpdatePokemonListDto,
  ): Promise<PokemonList> {
    return this.pokemonService.updateList(updatePokemonListDto);
  }

  @Delete(':/id')
  delete(@Param('id') id: string): Promise<Pokemon> {
    return this.pokemonService.delete(id);
  }
}
