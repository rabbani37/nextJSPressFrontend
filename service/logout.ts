"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const logOut = async () => {

    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    revalidateTag("my-profile", "max")
}

export default logOut;