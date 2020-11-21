import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { Pokemon } from 'src/pokemon/schemas/pokemon.schema';
import { User } from 'src/user/schema/user.schema';
import { CreateTeamDto } from './dtos/create-team.dto';
import { Team, TeamSchema } from './schema/team.schema';
@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private TeamModel: SoftDeleteModel<Team>,
    @InjectModel(User.name)
    private UserModel: SoftDeleteModel<User>,
    @InjectModel(Pokemon.name)
    private PokemonModel: SoftDeleteModel<Pokemon>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const { name, pokemon, isPrivate, user, stats, favorite } = createTeamDto;

    const userId = await this.UserModel.findOne({ username: user }).select(
      'id',
    );
    const createdTeam = new this.TeamModel({
      user: userId,
      name,
      pokemon,
      isPrivate,
      stats,
      favorite,
    });
    if (favorite) {
      const oldFavorite = await this.UserModel.findById(userId).select(
        'favoriteTeam',
      );
      await this.TeamModel.findByIdAndUpdate(oldFavorite.favoriteTeam, {
        favorite: false,
      });
      await this.UserModel.findByIdAndUpdate(
        userId,
        {
          favoriteTeam: createdTeam.id,
        },
        {
          useFindAndModify: false,
        },
      );
    }

    return createdTeam.save();
  }

  async findByID(id: string): Promise<Team> {
    const selectedTeam = await this.TeamModel.findById(id).populate('user');
    return selectedTeam;
  }

  async delete(idTeam: string, idUser: string): Promise<Team> {
    const selectedTeam = await this.TeamModel.findById(idTeam).populate('user');
    if (selectedTeam.user === idUser)
      throw new BadRequestException('Usuário inválido');
    const delectedTeam = await this.TeamModel.deleteById(idTeam);

    return delectedTeam;
  }

  async index(): Promise<Team[]> {
    const selectedUser = await this.TeamModel.find()
      .populate('user')
      .populate({ path: 'pokemon', model: 'Pokemon' });
    return selectedUser;
  }

  async getByUser(username: string): Promise<Team[]> {
    const userRegex = new RegExp(username, 'i');

    const findedUser = await this.UserModel.find({
      username: userRegex,
    });
    const usersId = findedUser.map(user => {
      return mongoose.Types.ObjectId(user.id);
    });
    const selectedTeams = await this.TeamModel.where('user')
      .in(usersId)
      .populate({
        path: 'pokemon',
        model: 'Pokemon',
      })
      .populate('user');
    const filteredTeams = selectedTeams.filter(team => {
      if (!team.deleted) return team;
    });
    return filteredTeams;
  }
}
