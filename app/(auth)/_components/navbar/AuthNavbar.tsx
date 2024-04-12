import Image from "next/image"
import Link from "next/link"
import React from 'react'

const AuthNavbar = () => {
 
    return (
        <header className="sticky top-0 flex h-12 w-full p-2 drop-shadow-md bg-slate-400 z-20">
          <div className="flex flex-1 justify-center items-center gap-2">
          <Link className="flex flex-1 justify-center items-center gap-2" href="/">
            <Image src="/images/folder.svg" alt="logo" width={25} height={25}/>
            <h1 className="text-1xl font-extrabold ">Bookmark App</h1>
            </Link>
            </div>
        </header>
      )
}

export default AuthNavbar

