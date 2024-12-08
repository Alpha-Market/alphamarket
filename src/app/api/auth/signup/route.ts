import type { NextRequest } from "next/server";
import { getApiBase } from "@/config";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();

		const r = await fetch(`${getApiBase()}/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		const data = await r.json();

		if (!r.ok) {
			return NextResponse.json(
				{ error: data.detail },
				{ status: r.status },
			);
		}

		const message = data.message;
		const access_token = data.access_token;
		const refresh_token = data.refresh_token;
		const expires_at = data.expires_at; // Expire Time in Seconds
		const currentUnixTime = Math.floor(Date.now() / 1000); // Current time in seconds
		const maxAge = expires_at - currentUnixTime; // Calculate lifetime in seconds

		const response = NextResponse.json(
			{
				message,
			},
			{
				status: 200,
			},
		);

		response.cookies.set({
			name: "access_token",
			value: access_token,
			httpOnly: true,
			maxAge,
		});

		response.cookies.set({
			name: "refresh_token",
			value: refresh_token,
			httpOnly: true,
			maxAge,
		});

		response.cookies.set({
			name: "expires_at",
			value: expires_at,
			httpOnly: true,
			maxAge,
		});

		return response;
	}
	catch (error: any) {
		console.log({ error });
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
