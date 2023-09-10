import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { IUsersService } from './users.service.interface';

const usersServiceProvider = { provide: IUsersService, useClass: UsersService };

@Module({

  providers: [usersServiceProvider, PrismaService],
  exports: [usersServiceProvider],
  controllers: [UsersController],
})
export class UsersModule {}
