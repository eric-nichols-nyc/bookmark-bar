import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/navbar/navbar"
import { Sidebar } from "@/components/sidebar/sidebar"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="flex w-full">
            <div className="w-full">{children}</div>
        </main>
      </body>
    </html>
  )
}
