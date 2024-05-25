import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async newUser(userId: string) {
        return await this.prismaService.user.create({
            data: {
                auth: {
                    connect: {
                        id: userId
                    }
                }

            }, select: {
                createdAt: true,
                active: true
            }
        })
    }
}
