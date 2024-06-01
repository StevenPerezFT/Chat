import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly chatService: ChatService) { }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }


  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }


  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: { userId: string; message: string; room: string },
    @ConnectedSocket() client: Socket,
  ) {
    const createdMessage = await this.chatService.createMessage({
      id: data.userId,
      message: data.message,
    });

    client.broadcast.to(data.room).emit('message', {
      clientId: client.id,
      message: createdMessage.text,
      userId: data.userId,
      from: client.id.slice(8)
    })

    return createdMessage
  }
}