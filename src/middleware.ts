import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { TABS } from "./util/constants";

const PUBLIC_PATH = ["/", "/auth"];

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const tab = req.nextUrl.searchParams.get("tab");
    const token = req.cookies.get("access_token")?.value;

    const isPublicPath = PUBLIC_PATH.includes(pathname);

    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jose.jwtVerify(token as string, secret);

            const requestHeaders = new Headers(req.headers);
            requestHeaders.set("x-user-id", (payload as any).uid);

            // After Token Verification if isPublicPath then redirect to /home
            if (isPublicPath) {
                return NextResponse.redirect(
                    new URL("/home?tab=home", req.url),
                    {
                        headers: requestHeaders,
                    }
                );
            }

            if (pathname === "/home" && !TABS.includes(tab as string)) {
                return NextResponse.redirect(
                    new URL("/home?tab=home", req.url),
                    {
                        headers: requestHeaders,
                    }
                );
            }

            // Otherwise, allow access to protected route
            return NextResponse.next({
                headers: requestHeaders,
            });
        } catch (error) {
            console.error("JWT verification failed:", error);

            // If token verification fails, clear the token and redirect to /auth
            const response = NextResponse.redirect(new URL("/", req.url));
            response.cookies.delete("access_token");
            return response;
        }
    } else if (isPublicPath) {
        // If no token and trying to access a public route, allow access
        return NextResponse.next();
    }

    // If no token and trying to access a protected route, redirect to /
    return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
    matcher: ["/", "/auth", "/home", "/onboarding", "/host"],
};  
