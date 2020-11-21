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
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.z8nqp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    ),
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
