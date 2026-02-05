
"use val"
"use client"

import { useState } from "react"
import { signIn, signUp } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AuthFormProps {
    mode: "signin" | "signup"
}

export function AuthForm({ mode }: AuthFormProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (mode === "signup") {
                const { error } = await signUp.email({
                    email,
                    password,
                    name,
                }, {
                    onRequest: () => setLoading(true),
                    onResponse: () => setLoading(false),
                    onSuccess: () => {
                        window.location.href = "/dashboard";
                    },
                    onError: (ctx) => setError(ctx.error.message),
                })
            } else {
                const { error } = await signIn.email({
                    email,
                    password,
                }, {
                    onRequest: () => setLoading(true),
                    onResponse: () => setLoading(false),
                    onSuccess: () => {
                        window.location.href = "/dashboard";
                    },
                    onError: (ctx) => setError(ctx.error.message),
                })
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto backdrop-blur-md bg-opacity-90 dark:bg-opacity-90 shadow-xl border-t border-l border-white/20">
            <CardHeader>
                <CardTitle>{mode === "signin" ? "Sign In" : "Create Account"}</CardTitle>
                <CardDescription>
                    {mode === "signin" ? "Enter your credentials to access your account" : "Enter your details to create a new account"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === "signup" && (
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Loading..." : (mode === "signin" ? "Sign In" : "Sign Up")}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-500">
                    {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
                    <Link href={mode === "signin" ? "/sign-up" : "/sign-in"} className="underline text-primary">
                        {mode === "signin" ? "Sign Up" : "Sign In"}
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
