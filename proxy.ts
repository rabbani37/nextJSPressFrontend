import { NextRequest, NextResponse } from 'next/server'
import { JwtPayload } from "jsonwebtoken"
import { jwtUtils } from './utilis/jwt';
import { cookies } from 'next/headers';



// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const AUTH_ROUTER = ["/login", "/register"]
    const PUBLIC_ROUTER = ["/", "/news"];
    const pathName = request.nextUrl.pathname;


    const accessToken = request.cookies.get("accessToken")?.value;
    const decodeToken = accessToken ? jwtUtils.tokenVerify(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

    let userRole = null;

    if (decodeToken?.success) {
        userRole = (decodeToken.data as JwtPayload).role;
    }

    const cookieStore = await cookies()
    if (!decodeToken?.success) {
        cookieStore.delete("accessToken")
        return NextResponse.redirect(new URL("/login", request.url));
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



    const isPublic = PUBLIC_ROUTER.some((route) => route === pathName || pathName.startsWith(route + '/'));
    const isAuthRoute = AUTH_ROUTER.some(route => route === pathName || pathName.startsWith(route + "/"));


    if (!accessToken && !isPublic && !isAuthRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }




    if (pathName.startsWith("/dashbord") && userRole !== "USER") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    }
    else if (pathName.startsWith("/admin-dashbord") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    }
    else if (pathName.startsWith("/author-dashbord") && userRole !== "AUTHOR") {
        return NextResponse.redirect(new URL("/not-found", request.url));

    }
    // return NextResponse.redirect(new URL('/', request.url))
    console.log(userRole);
    return NextResponse.next()




}



export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
        // '/admin-dashbord/:path*',
        // '/author-dashbord/:path*'
    ],
}