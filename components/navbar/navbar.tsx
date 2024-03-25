import { CircleUserRound } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
export const Navbar = () => {
  return (
    <div className="relative flex h-12 w-full border p-2 drop-shadow-md">
      <div className="relative flex h-full w-32 flex-1 items-start justify-start">
        <Link href="/">
          <Image src="/images/logo.svg" alt="logo" width={40} height={35} />
        </Link>
      </div>
      <div className="flex flex-1 justify-center">
        <h1 className="text-1xl font-extrabold ">Bookmark App</h1>
      </div>
      <div className="flex flex-1 justify-end">
        <div>
          <CircleUserRound />
        </div>
      </div>
    </div>
  )
}
