import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy'
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IUsersService } from 'src/users/users.service.interface';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { IAuthService } from './auth.service.interface';

const usersServiceProvider = { provide: IUsersService, useClass: UsersService };
const authServiceProvider = { provide: IAuthService, useClass: AuthService };

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    })
  ],
  providers: [
    PrismaService,
    usersServiceProvider,
    authServiceProvider,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    JwtStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}
