import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function middleware(req) {
    const cookieStore = cookies();
    const authtoken = cookieStore.get('jstoken')?.value;
    if (
        req.nextUrl.pathname === "/api/ownerroute"
    ) {
        return;
    }

    // If the token is not present and the user is not on the root path ("/"), redirect them to the home route ("/")
    if (!authtoken && req.nextUrl.pathname !== "/") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // If the user is on the root path ("/") and has the token, redirect to "/owner/profile"
    if (authtoken && req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/owner/profile", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/owner/:path*", "/", "/api/:path*"]
};
