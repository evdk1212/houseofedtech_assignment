"use client"

import { signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function SignOutButton() {
    const router = useRouter()

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in")
                    router.refresh()
                }
            }
        })
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            className="text-red-400 hover:text-red-300 hover:bg-white/5"
            onClick={handleSignOut}
        >
            Sign Out
        </Button>
    )
}
