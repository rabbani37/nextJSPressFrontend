"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type TLoginState = {
    success: true;
    statusCode: number;
    message: string;
    data: { accessToken: string; refreshToken: string };
}




export const loginAction = async (previouState: TLoginState, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const payload = { email, password }
    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success) {
        const cookieStore = await cookies()
        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 24,
            sameSite: "lax"
        })
        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax"
        });

        redirect("/dashbord", "replace")
    };
    return result
};





type FormState = {
    message: string;
} | null;
export const registerAction = async (previouState: FormState, formData: FormData) => {


    const name = formData.get("name");
    const email = formData.get("email")
    const password = formData.get("password");
    const conformPassword = formData.get("confirmPassword");

    if (password !== conformPassword) {
        throw new Error("Password dosen't matched")
    }
    const payload = {
        name,
        email, password
    };

    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/users/register`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json()
    return result;
}