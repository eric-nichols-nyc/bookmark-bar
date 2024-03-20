import { Metadata } from "next"
import { BookmarkList } from "@/components/bookmark-list/bookmark-list"
import { BookmarkForm } from "@/components/BookmarkForm/bookmark-form"

export const metadata: Metadata = {
  title: "Next.js Enterprise Boilerplate",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://next-enterprise.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
      },
    ],
  },
}

export default function Web() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:py-16 lg:px-6">
          <BookmarkForm />
          <BookmarkList />
        </div>
      </section>
    </>
  )
}
