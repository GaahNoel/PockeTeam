import { Body, Controller, Get, Post } from '@nestjs/common';

import { Pokemon } from './schema/pokemon.schema';
import { CreatePokemonDto } from './dtos/create-pokemon.dto';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private userService: PokemonService) {}

  @Get('list')
  index(): Promise<Pokemon[]> {
    return this.userService.index();
  }

  @Post('create')
  create(@Body() createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    return this.userService.create(createPokemonDto);
  }
}
