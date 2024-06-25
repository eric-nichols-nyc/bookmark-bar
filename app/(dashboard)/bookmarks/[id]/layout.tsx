// import type { Metadata } from "next"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getFolders } from "@/actions/prisma/folders/folder-actions"
import { Sidebar } from "@/app/(dashboard)/_components/sidebar/sidebar"

export default async function BookmarkLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()

  await queryClient.fetchQuery({
    queryKey: ["folders"],
    queryFn: getFolders,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex size-full flex-1">
        <div className="z-[100] flex h-full w-[260px] overflow-auto">
          <Sidebar />
        </div>
        <div id="scroll-container" className="border-5 border-red flex flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </HydrationBoundary>
  )
}
