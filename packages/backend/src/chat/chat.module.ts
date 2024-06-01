import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "src/auth/config";
import { PrismaModule } from "src/prisma/prisma.module";
import { AtStrategy } from "src/auth/strategy";
import { AuthService } from "src/auth/auth.service";
import { ChatService } from "./chat.service";
import { ChatGateway } from './chat.gateway';

@Module({
    imports: [PrismaModule, JwtModule.registerAsync(jwtConfig)],
    providers: [ChatGateway, ChatService, AtStrategy, AuthService, ChatGateway]
})
export class ChatModule { }
