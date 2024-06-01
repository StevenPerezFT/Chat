import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private readonly prisma: PrismaService) { }

    async createMessage(data: { id: string; message: string }) {
        if (!data.id || !data.message) {
            throw new Error('Missing required fields');
        }

        const userExists = await this.prisma.auth.findUnique({
            where: { id: data.id },
        });

        if (!userExists) {
            throw new Error('User does not exist');
        }

        return await this.prisma.message.create({
            data: {
                authId: data.id,
                text: data.message,
            },
        });
    }

    async getMessagesByUser(id: string) {
        return this.prisma.message.findMany({
            where: { authId: id },
            orderBy: { createdAt: 'asc' },
        });
    }
}