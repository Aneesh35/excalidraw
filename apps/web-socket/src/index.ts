import { WebSocketServer } from "ws";
import { config } from "dotenv"
import { isAuthenticated, User } from "./libs/util";
config();
const ws = new WebSocketServer({ port: 8080 });
const user: User[] = [];
ws.on("connection", function (socket, request) {
    const url = request.url;
    if (!url) return;
    const queryParams = new URLSearchParams(url.split("?")[1])
    const token = queryParams.get('token') || "";
    if (!token) {
        ws.close();
        return
    }
    const userId = isAuthenticated(token);
    if (!userId) {
        ws.close();
        return
    }
    user.push({
        userId,
        rooms: [],
        ws: socket
    })
    socket.on("message", async (data) => {
        const parseData = JSON.parse(data as unknown as string)
        if(parseData.type=="join_room"){
             
        }
    })
})