export class CreatePokemonDto {
  name: string;

  moves?: Array<string>;

  type?: string;

  status?: {
    hp: number;
    speed: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
  };

  item?: string;
}
