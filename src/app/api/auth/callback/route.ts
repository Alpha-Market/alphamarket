import type { NextRequest } from "next/server";
import { getApiBase } from "@/config";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const code = req.nextUrl.searchParams.get("code");

	if (!code) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	try {
		const res = await axios.get(`${getApiBase()}/auth/callback?code=${code}`);
		const isNewUser = await res.data.isNewUser;
		const data = res.data;
		const access_token = data.access_token;
		const refresh_token = data.refresh_token;
		const expires_at = data.expires_at; // Expire Time in Seconds
		const currentUnixTime = Math.floor(Date.now() / 1000); // Current time in seconds
		const maxAge = expires_at - currentUnixTime; // Calculate lifetime in seconds

		const response = NextResponse.redirect(new URL(isNewUser ? "/onboarding" : "/home", req.url));

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
	catch (err) {
		console.error(err);
		return NextResponse.redirect(new URL("/", req.url));
	}
}
