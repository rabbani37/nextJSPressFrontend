"use server"


import { cookies } from "next/headers"



export const getNewAccessToken = async () => {


    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (!refreshToken) {
        // throw new Error("User is not logged In")
        return {
            success: false,
            message: "Refresh token are not found"
        }
    };


    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
            // Authorization: refreshToken as unknown as string
            // Authorization: `${refreshToken}`
            Cookie: `refreshToken=${refreshToken}`
        },
        cache: "no-cache",


    });

    const result = await res.json();

    return result;
}