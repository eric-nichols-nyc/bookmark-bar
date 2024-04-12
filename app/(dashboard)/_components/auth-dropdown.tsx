"use client"
import { SignOutButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { startTransition } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
const AuthDropdown = () => {
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SignOutButton
          signOutCallback={() =>
            startTransition(() => {
              router.push(`${window.location.origin}/?redirect=false`)
            })
          }
        >
          <Button
            aria-label="Log out"
            size="sm"
            className="w-full"
          >
         
            Log out
          </Button>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AuthDropdown