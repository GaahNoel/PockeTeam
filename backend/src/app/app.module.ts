import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from '../example/example.module';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://PockeTeam:pocketeam@cluster0.z8nqp.mongodb.net/PockeTeam?retryWrites=true&w=majority',
    ),
    UserModule,
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
