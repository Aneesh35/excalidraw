import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.AUTH_SECRET })
        if (!token) {
            return NextResponse.json({ "message": "Unauthorized user" }, { status: 401 })
        }
        const newToken = jwt.sign({ name: token.name, id: token.id, email: token.email }, process.env.AUTH_SECRET as string)
        return NextResponse.json({ message: "token Fetch success!!", token: newToken }, { status: 201 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ "message": "Internal server Error" }, { status: 501 })
    }

}