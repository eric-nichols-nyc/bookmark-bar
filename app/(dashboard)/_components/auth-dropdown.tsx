"use client"
import { SignOutButton } from '@clerk/nextjs/server'
import { useRouter } from 'next/navigation'
import React, { startTransition } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
const AuthDropdown = () => {
  const router = useRouter()
  return (
    <div className='w-full'>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='w-full'>Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[260px]'>
        <DropdownMenuItem>
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
            className="w-full flex justify-start text-left"
          >
            Log out
          </Button>
        </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}

export default AuthDropdown