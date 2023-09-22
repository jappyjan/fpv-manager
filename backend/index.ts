import {createServer} from "http";
import {Server, Socket} from "socket.io";

export async function startSignalingServer(port: number): Promise<string> {
    const server = createServer();
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        }
    });
    const socketByPeerId = new Map();
    const socketsByRoom = new Map();
    io.on('connection', (socket) => {
        socket.on('signal', (message) => {
            socketByPeerId.get(message.to).emit('signal', message);
        });

        socket.on('join', (message) => {
            if (!socketsByRoom.has(message.room)) {
                console.log('START NEW ROOM: ' + message.room);
                socketsByRoom.set(message.room, []);
            }

            socketsByRoom.get(message.room).push({
                socket,
                peerId: message.peerId
            });

            socketByPeerId.set(message.peerId, socket);

            const roomPeerIds = socketsByRoom.get(message.room)
                .map((row: { peerId: unknown }) => row.peerId);

            socketsByRoom.get(message.room).forEach((row: { socket: Socket }) => {
                row.socket.emit('joined', roomPeerIds);
            });
        });
    });

    return new Promise(res => {
        server.listen(port, () => {
            res('ws://localhost:' + port);
        });
    });
}

startSignalingServer(8080).then((url) => {
    console.log('Signaling server started at ' + url);
});