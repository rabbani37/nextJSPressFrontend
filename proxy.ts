import { NextRequest, NextResponse } from 'next/server'
import { JwtPayload } from "jsonwebtoken"
import { jwtUtils } from './utilis/jwt';
import { getNewAccessToken } from './service/refreshToken';



// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const AUTH_ROUTER = ["/login", "/register"]
    const PUBLIC_ROUTER = ["/", "/news"];
    const pathName = request.nextUrl.pathname;


    
    let accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value
  

    let decodeAccessToken = accessToken ? jwtUtils.tokenVerify(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

    const decodeRefreshToken = refreshToken ? jwtUtils.tokenVerify(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;

    if (!decodeAccessToken?.success && decodeRefreshToken?.success) {
        const result = await getNewAccessToken();
        if (result.success) {
            const newAccessToken = result.data.accessToken;
            request.cookies.set("accessToken", newAccessToken, );

            accessToken = newAccessToken;
            decodeAccessToken = jwtUtils.tokenVerify(accessToken!, process.env.JWT_ACCESS_SECRET as string);
        }
    }



    let userRole = null;

    if (decodeAccessToken?.success) {
        userRole = (decodeAccessToken.data as JwtPayload).role;
    }



    if (!decodeAccessToken?.success) {
        request.cookies.delete("accessToken")
        // return NextResponse.redirect(new URL("/login", request.url));
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
    // console.log(userRole);
    return NextResponse.next()




}



export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
        // '/admin-dashbord/:path*',
        // '/author-dashbord/:path*'
    ],
}