'use client';

import { useEffect, useState } from 'react';
import socket from '../../utils/socket';
import { jwtDecode } from 'jwt-decode';

interface Message {
    clientId: string;
    userId: string;
    message: string;
    from?: string;
    room?: string;
}

const ChatComponent = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState<string>('');
    const [room, setRoom] = useState<string>('general');

    useEffect(() => {
        const receiveMessage = (message: Message) => {
            setMessages((state) => [message, ...state]);
        };

        socket.on('message', receiveMessage);

        socket.emit('joinRoom', room);

        return () => {
            socket.off('message', receiveMessage);
            socket.emit('leaveRoom', room);
        };
    }, [room]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const token = localStorage.getItem('subToken');
        if (!token) {
            console.error('Token not found');
            return;
        }
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.sub;

        const newMessage: Message = {
            clientId: '',
            userId: userId || '',
            message: text,
            from: 'Me',
            room: room,
        };
        const { userId: id, message, room: messageRoom } = newMessage;

        setMessages((state) => [{ ...newMessage, from: 'Me' }, ...state]);
        setText('');
        socket.emit('message', { userId: id, message, room: messageRoom });
    };

    return (
        <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
                <h1 className="text-2xl font-bold my-2">Chat React</h1>
                <input
                    name="message"
                    type="text"
                    placeholder="Write your message..."
                    onChange={(e) => setText(e.target.value)}
                    className="border-2 border-zinc-500 p-2 w-full text-black"
                    value={text}
                    autoFocus
                />
                <input
                    name="room"
                    type="text"
                    placeholder="Write your room..."
                    onChange={(e) => setRoom(e.target.value)}
                    className="border-2 border-zinc-500 p-2 w-full text-black"
                    value={room}
                />

                <ul className="h-80 overflow-y-auto">
                    {messages.map((message, index) => (
                        <li
                            key={index}
                            className={`my-2 p-2 table text-sm rounded-md ${message.from === 'Me' ? 'bg-sky-700 ml-auto' : 'bg-black'}`}
                        >
                            <b>{message.from}</b>:{message.message}
                        </li>
                    ))}
                </ul>
                <div>
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    );
};

export default ChatComponent;
