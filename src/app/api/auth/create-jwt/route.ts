import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    const { uid, email } = await req.json();

    try {
        const token = jwt.sign(
            {
                uid,
                email,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        return NextResponse.json({ status: "success", token });
    } catch (error) {
        console.error("Failed to create jwt token", error);
        return NextResponse.json(
            { status: "error", message: "Failed to create jwt token" },
            { status: 500 }
        );
    }
}
