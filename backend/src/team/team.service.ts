import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { CreateTeamDto } from './dtos/create-team.dto';
import { Team } from './schema/team.schema';
@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private TeamModel: SoftDeleteModel<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const createdUser = new this.TeamModel(createTeamDto);
    return createdUser.save();
  }

  async findByID(id: number): Promise<Team> {
    const selectedUser = this.TeamModel.findById(id);
    return selectedUser;
  }

  async index(): Promise<Team[]> {
    const selectedUser = this.TeamModel.find();
    return selectedUser;
  }
}
