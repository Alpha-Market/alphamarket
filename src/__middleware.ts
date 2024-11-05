import { NextRequest, NextResponse } from "next/server";
import { TABS } from "./util/constants";
import axios from "axios";

const PUBLIC_PATH = ["/", "/auth"];

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const tab = req.nextUrl.searchParams.get("tab");
    const token = req.cookies.get("access_token")?.value;

    console.log({ token });

    const isPublicPath = PUBLIC_PATH.includes(pathname);

    if (token) {        
        const res = await axios.post(`${req.nextUrl.origin}/api/auth/verify-jwt`, {
            token
        });

        if (res.status === 200) {
            const data = res.data;
            const decodedToken = data["decodedToken"];
            console.log({ decodedToken });

            // const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            // const { payload } = await jose.jwtVerify(token as string, secret);

            // const requestHeaders = new Headers(req.headers);
            // requestHeaders.set("x-user-id", (payload as any).uid);

            // After Token Verification if isPublicPath then redirect to /home
            if (isPublicPath) {
                return NextResponse.redirect(
                    new URL("/home?tab=home", req.url)
                );
            }

            if (pathname === "/home" && !TABS.includes(tab as string)) {
                return NextResponse.redirect(
                    new URL("/home?tab=home", req.url)
                );
            }

            // Otherwise, allow access to protected route
            return NextResponse.next();
        } else {
            console.error("JWT verification failed:", res.statusText);

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
