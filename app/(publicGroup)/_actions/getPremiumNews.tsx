"use server"

import { cookies } from "next/headers";

export const getPremiumNews = async ({ search }: { search?: { [key: string]: string[] | string | undefined } }) => {


    const searchTerm = `${search?.searchTerm ? `?searchTerm=${search?.searchTerm}` : ""}`

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
        // throw new Error("User is not logged In")
        return {
            success: false,
            message: "User is not logged In"
        }
    };





    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/premium${searchTerm}`, {
        headers: {
            Cookie: `accessToken=${accessToken}`,

        },
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24, // 1days
            tags: ["premium-posts"]
        }
    });

    const result = await res.json();
    return result;
}