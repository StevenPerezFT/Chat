import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { AuthSignUpDto } from 'dto/sign-up';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, compare } from 'bcrypt';
import { Token } from './interface';
import { Public } from 'src/common';
import { AuthSignInDto } from 'dto/sign-in';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prismaService: PrismaService,
  ) { }

  @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() { name, email, password }: AuthSignUpDto) {
    const user = await this.prismaService.auth.findUnique({
      where: {
        email,
      },
    });
    if (user)
      throw new ConflictException('User with that email already exists');
    const hashedPassword = await hash(password, 10);

    return this.prismaService.auth.create({
      data: {
        name,
        email,
        hashedPassword,
      },
      select: {
        name: true,
        email: true,
        createdAt: true,
      }
    });
  }

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() { email, password }: AuthSignInDto): Promise<Token> {
    const auth = await this.prismaService.auth.findUnique({
      where: {
        email,
      },
    });
    if (!auth) throw new BadRequestException('Email or password incorrect');
    const passwordMatches = await compare(password, auth.hashedPassword);
    if (!passwordMatches)
      throw new BadRequestException('Email or password incorrect');

    return this.authService.getTokens(auth);
  }

}
