import { currentUser, SignOutButton } from "@clerk/nextjs"
import { CircleUserRound } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AuthDropdown from "@/app/(dashboard)/_components/auth-dropdown"
import { Button } from "../ui/button"


export const Navbar = async() => {
  const user = await currentUser();
 
  return (
    <header className="sticky top-0 flex h-12 w-full p-2 drop-shadow-md bg-slate-400 z-20">
      <div className="relative container flex h-full w-32 flex-1 items-start justify-start">
        <Link href="/">
          <Image src="/images/logo.svg" alt="logo" width={40} height={35} />
        </Link>
      </div>
      <div className="flex flex-1 justify-center items-center gap-2">
      <Image src="/images/folder.svg" alt="logo" width={25} height={25}/>
        <h1 className="text-1xl font-extrabold ">Bookmark App</h1>
      </div>
      <div className="flex flex-1 justify-end">
        <div>
          {
            user ? <AuthDropdown /> : <Link href="sign-in"><Button>Sign in</Button></Link> 
          }
          {/* <CircleUserRound />
          }
          <AuthDropdown />
          {/* <CircleUserRound />
          <SignOutButton /> */}
        </div>
      </div>
    </header>
  )
}
