import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config';
import { AtStrategy } from './strategy';

@Module({
  imports: [PrismaModule, JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
  providers: [AtStrategy, AuthService]
})
export class AuthModule { }
