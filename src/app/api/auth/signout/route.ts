import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const response = NextResponse.json({
		message: "Signed Out Successfully",
	});

	response.cookies.delete("access_token");
	response.cookies.delete("refresh_token");
	response.cookies.delete("expires_at");

	return response;
}
