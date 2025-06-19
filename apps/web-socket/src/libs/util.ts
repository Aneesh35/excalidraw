import jwt from "jsonwebtoken"
import WebSocket from "ws";

export const isAuthenticated = (token: string) => {
   
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