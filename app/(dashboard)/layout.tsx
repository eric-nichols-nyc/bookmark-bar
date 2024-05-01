import type { Metadata } from "next"

import { Navbar } from "./_components/navbar/navbar";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  icons: [
    {
      url: "/images/logo.svg",
      href: "/images/logo.svg",
    },
  ],
}
export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
        <Navbar />
        <div className="h-full">{children}</div>
    </div>
  )
}
