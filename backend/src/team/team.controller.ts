import { Body, Controller, Get, Post } from '@nestjs/common';
import { Team } from './schema/team.schema';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dtos/create-team.dto';
@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get('list')
  index(): Promise<Team[]> {
    return this.teamService.index();
  }

  @Post('create')
  create(@Body() createTeamDTO: CreateTeamDto): Promise<Team> {
    return this.teamService.create(createTeamDTO);
  }
}
