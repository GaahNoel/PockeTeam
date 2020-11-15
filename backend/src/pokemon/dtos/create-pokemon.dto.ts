export class CreatePokemonDto {
  name: string;

  image: string;

  moves?: Array<string>;

  type?: string;

  stats?: {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    speed: number;
  };

  item?: {
    name: string;
    image: string;
  };
}
