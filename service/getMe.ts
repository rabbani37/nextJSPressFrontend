"use server"


import { cookies } from "next/headers"



export const getMe = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
        // throw new Error("User is not logged In")
        return {
            success: false,
            message: "User is not logged In"
        }
    };


    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/users/me`, {
        headers: {
            // Authorization: accessToken as unknown as string
            Authorization: `${accessToken}`
            // Cookie: `accessToken=${accessToken}`
        },
        cache:"force-cache",
        next:{
            revalidate:60*60*24,
            tags:["my-profile"]
        }

    });

    const result = await res.json();

    return result;
}