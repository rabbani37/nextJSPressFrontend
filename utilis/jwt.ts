import jwt from "jsonwebtoken";




const tokenVerify = (token: string, secret: string) => {
    try {
        const verified = jwt.verify(token, secret)
        return {
            success: true,
            data: verified
        };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        return {
            success:false,
            error:error.message 
        }
    }
}

export const jwtUtils = {
    tokenVerify
}