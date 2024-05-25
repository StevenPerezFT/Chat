import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from '@prisma/client';
import appConfig from 'src/auth/config/app';
import { Token } from './interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }
  async getTokens({ email, id }: Auth): Promise<Token> {
    const at = await this.jwtService.signAsync(
      {
        sub: id,
        email,
      },
      {
        secret: appConfig().appSecret,
        expiresIn: 60 * 15,
      },
    );
    return {
      access_token: at,
    };
  }
}