import { Pokemon } from 'src/pokemon/schemas/pokemon.schema';

export class CreateTeamDto {
  name: string;

  pokemons: Array<Pokemon>;
}
