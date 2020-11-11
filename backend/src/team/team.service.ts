import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
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
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const { name, pokemons, isPrivate, user } = createTeamDto;
    const userId = this.UserModel.findOne({ username: user }).select('id');
    const createdTeam = new this.TeamModel({
      name,
      pokemons,
      isPrivate,
      user: userId,
    });
    return createdTeam.save();
  }

  async findByID(id: number): Promise<Team> {
    const selectedUser = this.TeamModel.findById(id);
    return selectedUser;
  }

  async index(): Promise<Team[]> {
    const selectedUser = this.TeamModel.find();
    return selectedUser;
  }

  async getByUser(username: string): Promise<Team[]> {
    const userId = this.UserModel.findOne({ username }).select('id');

    const selectedTeams = this.TeamModel.find({ user: userId });
    return selectedTeams;
  }
}
