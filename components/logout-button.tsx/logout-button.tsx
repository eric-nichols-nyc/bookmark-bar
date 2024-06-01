"use client"
import { SignOutButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { startTransition } from "react"
import { Button } from "../ui/button"


export const LogoutButton = () => {
    const router = useRouter()
    return (
        <SignOutButton
            // signOutCallback={() =>
            //     startTransition(() => {
            //         router.push(`${window.location.origin}/?redirect=false`)
            //     })
            // }
        >
            <Button data-testid="navbar-logout">
                Sign Out
            </Button>
        </SignOutButton>
    )
}

