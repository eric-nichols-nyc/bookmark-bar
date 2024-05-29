import Image from 'next/image'
import Link from 'next/link'
export const Logo = () => {
  return (
    <Link href="/" className="flex items-center w-[120px] gap-2 font-semibold"><Image alt="logo" src="/images/logo.svg" width={24} height={24}/><div>Webmark</div></Link>
  )
}
