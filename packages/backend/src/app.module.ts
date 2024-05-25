import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './auth/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuardJwt } from './auth/guard';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
    AuthModule,
    UserModule,
    AppModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuardJwt }],
})
export class AppModule { }
