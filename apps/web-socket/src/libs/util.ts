import jwt from "jsonwebtoken"
import WebSocket from "ws";

export const isAuthenticated = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.AUTH_SECRET as string);
        if (typeof (decoded) === "string" || !decoded || !decoded.user) {
            return;
        }
        const userId = decoded.user.id;
        return userId
    } catch (err) {
        console.log("JWT ERROR!!\n", err)
        return;
    }
}

export interface User {
    userId: string;
    ws: WebSocket;
    rooms: Set<string>;
}

export interface Data {
    type: string,
    roomId: string,
    id?: string,
    message?: string,
}