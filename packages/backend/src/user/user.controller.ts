import { Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { TokenSub } from 'src/common/user/token.sub';
import { AuthGuardJwt } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { Public } from 'src/common';

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private prismaService: PrismaService) { }

    @Post('me')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuardJwt)
    async me(@TokenSub() userId: string) {
        const userExist = await this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!userExist) {
            return this.userService.newUser(userId)
        } else {
            return HttpStatus.FOUND
        }
    }
    @Public()
    @Get('test')
    async test() {
        return await this.prismaService.user.findMany()
    }
}
