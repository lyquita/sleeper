import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UserDocument } from './models/user.schema';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {name: UserDocument.name, schema:UserDocument}
    ]),
    LoggerModule
  ],
  exports: [UsersService]
})
export class UsersModule {}
