import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { Pokemon } from 'src/pokemon/schemas/pokemon.schema';
import { User } from 'src/user/schema/user.schema';
import { CreateTeamDto } from './dtos/create-team.dto';
import { Team } from './schema/team.schema';
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
    const { name, pokemon, isPrivate, user, stats } = createTeamDto;
    const userId = await this.UserModel.findOne({ username: user }).select(
      'id',
    );
    console.log(userId);
    console.log(createTeamDto);
    const createdTeam = new this.TeamModel({
      user: userId,
      name,
      pokemon,
      isPrivate,
      stats,
    });
    return createdTeam.save();
  }

  async findByID(id: string): Promise<Team> {
    const selectedTeam = await this.TeamModel.findById(id).populate('user');
    return selectedTeam;
  }

  async index(): Promise<Team[]> {
    const selectedUser = await this.TeamModel.find();
    return selectedUser;
  }

  async getByUser(username: string): Promise<Team[]> {
    const { _id: id } = await this.UserModel.findOne({
      username,
    }).select('id');
    const selectedTeams = await this.TeamModel.find({ user: id }).populate({
      path: 'pokemon',
      model: 'Pokemon',
    });
    // const selectedTeams = this.TeamModel.find({ user: userId });
    return selectedTeams;
  }
}
