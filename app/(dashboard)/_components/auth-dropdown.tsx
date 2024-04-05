import { SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const AuthDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href="/auth/login">
        <SignOutButton />
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AuthDropdown