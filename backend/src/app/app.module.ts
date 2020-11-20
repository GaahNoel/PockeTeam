import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from 'src/email/email.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from '../example/example.module';
import { UserModule } from '../user/user.module';
import { TeamModule } from '../team/team.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://PockeTeam:pocketeam@cluster0.z8nqp.mongodb.net/PockeTeam?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    PokemonModule,
    ExampleModule,
    TeamModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
