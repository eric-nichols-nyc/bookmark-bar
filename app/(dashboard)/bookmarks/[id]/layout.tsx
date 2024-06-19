// import type { Metadata } from "next"
import { Sidebar } from "@/app/(dashboard)/_components/sidebar/sidebar"

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
//   icons: [
//     {
//       url: "/images/logo.svg",
//       href: "/images/logo.svg",
//     },
//   ],
// }

export default function BookmarkLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-1 size-full">
      <div className="flex h-full w-[260px] overflow-auto z-[100]">
        <Sidebar />
      </div>
      <div id="scroll-container" className="flex flex-1 overflow-auto border-5 border-red">
      {children}
      </div>
    </div>
  )
}
