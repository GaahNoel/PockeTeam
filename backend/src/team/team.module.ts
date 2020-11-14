import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from 'src/pokemon/schemas/pokemon.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { Team, TeamSchema } from './schema/team.schema';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
  ],

  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
