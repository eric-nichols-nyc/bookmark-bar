import { PlusIcon } from "lucide-react"
import { Metadata } from "next"
import { getCategories } from "@/actions/categories/category-actions"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Category } from "@/types"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Bookmark Manager - save and organize your bookmarks",
  twitter: {
    card: "summary_large_image",
  },
  icons: [
    {
      url: "/images/logo.svg",
      href: "/images/logo.svg",
    },
  ],
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

async function fetchCategories() {
  try {
    const categories = await getCategories()
    return categories
  } catch (e) {
    console.log("error with categories")
  }
}

export default async function Web() {
  const categories = await fetchCategories()
  return (
    <section className="container w-full border bg-white">
      <div className="mx-auto grid max-w-screen-lg grid-flow-row-dense grid-cols-4 grid-rows-4 gap-2 border px-4 py-8 sm:py-16 lg:px-6">
        {categories &&
          categories.length > 0 &&
          categories.map((cat: Category) => (
            <AspectRatio key={cat._id} ratio={16 / 9} className="bg-muted">
              <Link className="flex size-full border" href={`/bookmark/${cat._id}/${cat.category}`} >{cat.category}</Link>
            </AspectRatio>
          ))}
        <div className="col-span-1 row-span-1 border">
          <div className="flex items-center justify-center">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <PlusIcon className="size-8 text-primary" />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  )
}
