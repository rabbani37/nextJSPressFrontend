import { NextRequest, NextResponse } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken"
import { url } from 'inspector';
import { NestedMiddlewareError } from 'next/dist/build/utils';


// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const AUTH_ROUTER = ["/login", "/register"]
    const pathName = request.nextUrl.pathname;


    const accessToken = request.cookies.get("accessToken")?.value;
    const decodeToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null;

    let userRole = null;

    if (decodeToken) {
        userRole = decodeToken.role;
    }


    // user already logged in. But trying to accecss login and register routes. now redirect to dashbord, root home page
    if (accessToken && AUTH_ROUTER.includes(pathName)) {
        if (userRole === "USER") {
            return NextResponse.redirect(new URL("/dashbord", request.url));
        }
        else if (userRole === "ADMIN") {
            return NextResponse.redirect(new URL("/admin-dashbord", request.url));
        }
        else if (userRole === "AUTHOR") {
            return NextResponse.redirect(new URL("/author-dashbord", request.url));
        }
        else {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }


    // return NextResponse.redirect(new URL('/', request.url))
    return NextResponse.next()


}



export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
        // '/admin-dashbord/:path*',
        // '/author-dashbord/:path*'
    ],
}