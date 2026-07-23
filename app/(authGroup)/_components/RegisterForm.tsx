"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useActionState, useEffect } from "react"
import { registerAction } from "../_actions/authActions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const RegisterForm = () => {

    const router = useRouter()
    const [state, action, pending] = useActionState(registerAction, false)



    useEffect(() => {

        if (!state) return
        if (state.success) {
            toast.success(state.message || "Logind");
            router.push("/login")
        }

        if (!state.success) {
            toast.error(state.message || "Login Failed")

        }
    }, [state, router])


    return (
        <div>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Create your account</CardTitle>
                    <CardDescription>
                        Enter your email below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={action}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                <Input name="name" type="text" placeholder="John Doe" required />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <Field className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <Input name="password" type="password" required />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="confirm-password">
                                            Confirm Password
                                        </FieldLabel>
                                        <Input name="confirmPassword" type="password" required />
                                    </Field>
                                </Field>
                                <FieldDescription>
                                    Must be at least 8 characters long.
                                </FieldDescription>
                            </Field>
                            <Field>
                                <Button type="submit">{pending ? "Creating" : "Create Account"}</Button>
                                <FieldDescription className="text-center">
                                    Already have an account? <a href="/login">Loign</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

        </div>
    )
}


export default RegisterForm;