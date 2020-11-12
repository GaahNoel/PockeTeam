import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('/:id')
  findByID(@Param('id') id: string): Promise<Team> {
    return this.teamService.findByID(id);
  }

  @Get('/user/:username')
  getByUser(@Param('username') username: string): Promise<Team[]> {
    return this.teamService.getByUser(username);
  }

  @Post('create')
  create(@Body() createTeamDTO: CreateTeamDto): Promise<Team> {
    return this.teamService.create(createTeamDTO);
  }
}
