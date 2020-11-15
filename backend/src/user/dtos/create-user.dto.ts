export class CreateUserDto {
  login: string;

  username: string;

  email: string;

  password: string;

  info?: string;

  favoritePokemon?: string;

  favoriteTeam?: string;
}
