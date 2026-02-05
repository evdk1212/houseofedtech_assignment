
import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
    const { data: session } = await betterFetch<typeof auth.$Infer.Session>(
        "/api/auth/get-session",
        {
            baseURL: request.nextUrl.origin,
            headers: {
                //get the cookie from the request
                cookie: request.headers.get("cookie") || "",
            },
        },
    );

    if (session && (request.nextUrl.pathname.startsWith("/sign-in") || request.nextUrl.pathname.startsWith("/sign-up"))) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
