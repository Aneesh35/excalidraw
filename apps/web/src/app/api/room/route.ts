import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { v4 as uuidv4 } from "uuid"
import { CreateRoomSchema } from "@repo/schemas/userschema";
import dbClient from "@repo/database/dbclient";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const generateRoomID = (): string => {
            return uuidv4().replace(/-/g, "").substring(0, 6).toUpperCase();
        };
        const result = CreateRoomSchema.safeParse(body)
        const token = await getToken({ req, secret: process.env.AUTH_SECRET })
        if (!result.success) {
            return NextResponse.json({ error: "Invalid data" }, { status: 301 });
        }
        if (!token || !token.id) {
            return NextResponse.json({ error: "unauthenticated" }, { status: 301 });
        }
        const userId = token.id as string
        const room = await dbClient.room.create({
            data: {
                id: generateRoomID(),
                slug: result.data.name,
                adminId: userId,
                users: {
                    connect: [{ id: userId }]
                }
            }
        })
        return NextResponse.json({ message: "room created successfully", roomId: room.id }, { status: 201 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "Invalid Room Name!!" }, { status: 301 })
    }
}