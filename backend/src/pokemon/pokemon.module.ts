import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './schema/pokemon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
  ],
  providers: [PokemonService],
  controllers: [PokemonController],
})
export class PokemonModule {}
