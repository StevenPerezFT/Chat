import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/auth/config';
import { AtStrategy } from 'src/auth/strategy';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [PrismaModule, JwtModule.registerAsync(jwtConfig)],
  controllers: [UserController],
  providers: [UserService, AtStrategy, AuthService]
})
export class UserModule { }
