import { currentUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { LogoutButton } from "../logout-button.tsx/logout-button"
import { Button } from "../ui/button"

export const Navbar = async() => {
  const user = await currentUser();
  if(!user){
    console.log("User not found")
  }
 
  return (
    <header className="sticky top-0 flex h-12 w-full p-2 drop-shadow-md bg-slate-400 z-20">
      <div className="relative flex h-full w-32 flex-1 items-start justify-between">
        <Link className="flex gap-2" href="/">
         <Image src="/images/folder.svg" alt="logo" width={25} height={25}/>
         <h1 className="text-1xl font-extrabold ">Bookmark App</h1>
        </Link>
        {
          user ?
          <LogoutButton />
         : <Link href="/signin"><Button id="signin" >Sign in</Button></Link>
        }
      </div>
    </header>
  )
}
