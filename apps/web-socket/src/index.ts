import { WebSocketServer } from "ws";
import { config } from "dotenv"
import { Data, isAuthenticated, User } from "./libs/util";
config();
const ws = new WebSocketServer({ port: 8080 });
const user: User[] = [];
// ws.on("connection", function (socket, request) {
//     const url = request.url;
//     if (!url) return;
//     // check for token in url params
//     const queryParams = new URLSearchParams(url.split("?")[1])
//     const token = queryParams.get('token') || "";
//     const userId = isAuthenticated(token);
//     // if users userId is not found ws connection is closed and returned
//     if (!userId) {
//         ws.close();
//         return
//     }
//     // user stored in websocket
//     user.push({
//         userId,
//         rooms: new Set(),
//         ws: socket
//     })

//     socket.on("message", async (data) => {
//         const parseData: Data = JSON.parse(data as unknown as string)
//         if (parseData.type == "join-Room") {
//             return
//         }
//     })
// })