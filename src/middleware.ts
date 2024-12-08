import type { NextRequest } from "next/server";

import { verifyTokenLocally, verifyTokenServerSide } from "@/lib/utils";

import { NextResponse } from "next/server";
import { TABS } from "./util/constants";

const PUBLIC_PATHS = ["/", "/auth"];
const PRIVATE_PATHS = ["/onboarding", "/home", "/host"];

export async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname;
	const tab = req.nextUrl.searchParams.get("tab");
	const access_token = req.cookies.get("access_token")?.value || "";
	const refresh_token = req.cookies.get("refresh_token")?.value || "";
	const expires_at = req.cookies.get("expires_at")?.value || "";

	const isPublicPath = PUBLIC_PATHS.includes(pathname);

	if (!refresh_token) {
		if (isPublicPath) {
			return NextResponse.next();
		}
		return NextResponse.redirect(new URL("/", req.url));
	}

	if (verifyTokenLocally(Number.parseInt(expires_at))) {
		if (isPublicPath || (pathname === "/home" && !TABS.includes(tab as string))) {
			return NextResponse.redirect(new URL("/home?tab=home", req.url));
		}
		return NextResponse.next();
	}

	const { authenticated, new_access_token, new_refresh_token } = await verifyTokenServerSide(access_token, refresh_token);

	if (!authenticated) {
		const response = NextResponse.redirect(new URL("/", req.url));
		response.cookies.delete("access_token");
		response.cookies.delete("refresh_token");
		return response;
	}

	let response;

	if (isPublicPath || (pathname === "/home" && !TABS.includes(tab as string))) {
		response = NextResponse.redirect(
			new URL("/home?tab=home", req.url),
		);
	}
	else {
		response = NextResponse.next();
	}

	if (new_access_token) {
		response.cookies.set("access_token", new_access_token, {
			httpOnly: true,
			secure: true,
			path: "/",
			maxAge: 60 * 60 * 24 * 7, // 7 days
		});
	}

	if (new_refresh_token) {
		response.cookies.set("refresh_token", new_refresh_token, {
			httpOnly: true,
			secure: true,
			path: "/",
			maxAge: 60 * 60 * 24 * 7, // 7 days
		});
	}

	return response;
}

export const config = {
	matcher: ["/", "/auth", "/home", "/onboarding", "/host"],
};
