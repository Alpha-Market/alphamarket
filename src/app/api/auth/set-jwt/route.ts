import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { token } = await req.json();

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day expiration
    };

    return NextResponse.json(
        { success: true },
        {
            headers: {
                "Set-Cookie": `access_token=${token}; Max-Age=${options.maxAge}; Path=${options.path}; HttpOnly; Secure=${options.secure}; SameSite=Lax`,
            },
        }
    );
}
