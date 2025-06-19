import { WebSocketServer } from "ws";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { Data, User } from "./libs/util";

config();

const wss = new WebSocketServer({ port: 8080 });
const users: User[] = [];

wss.on("connection", (socket, request) => {
    console.log("Someone is trying to connect...");

    const url = request.url;
    if (!url) {
        socket.close();
        return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token");

    if (!token) {
        console.log("No token provided");
        socket.close();
        return;
    }

    let decoded: any;

    try {
        decoded = jwt.verify(token, process.env.AUTH_SECRET as string);
    } catch (err) {
        console.log("Invalid token");
        socket.close();
        return;
    }

    if (!decoded?.id) {
        console.log("Invalid token");
        socket.close();
        return;
    }

    const userId = decoded.id;

    console.log("User authenticated:", userId);

    const currentUser: User = {
        userId,
        rooms: new Set(),
        ws: socket
    };

    users.push(currentUser);

    socket.on("message", (message) => {
        try {
            const parsed: Data = JSON.parse(message.toString());
            switch (parsed.type) {
                case "join-Room":
                    currentUser.rooms.add(parsed.roomId);
                    console.log(`${userId} joined room ${parsed.roomId}`);
                    break;
                default:
                    console.log("Unknown message type:", parsed.type);
            }
        } catch (err) {
            console.error("Invalid message received:", message);
        }
    });

    socket.on("close", () => {
        console.log("User disconnected:", userId);
        const index = users.findIndex(u => u.userId === userId && u.ws === socket);
        if (index !== -1) users.splice(index, 1);
    });
});
