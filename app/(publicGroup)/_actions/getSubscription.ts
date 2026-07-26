"use server"

import { cookies } from "next/headers";

export const getSubscription = async () => {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
        // throw new Error("User is not logged In")
        return {
            success: false,
            message: "User is not logged In"
        }
    };





    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/subscription/status`, {
        method: "GET",
        headers: {
            Cookie: `accessToken=${accessToken}`,

        }
    });

    const result = await res.json();

    return result;
}