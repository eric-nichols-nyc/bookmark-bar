import { Metadata } from "next"
import Link from "next/link"
import { getCategories } from "@/actions/categories/category-actions"
import {NewCategoryForm} from "@/components/new-category-form/new-category-form"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Category } from "@/types"

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
      <div className="mx-auto grid max-w-screen-lg grid-flow-row-dense grid-cols-4 grid-rows-4 gap-2 px-4 py-8 sm:py-16 lg:px-6">
        {categories &&
          categories.length > 0 &&
          categories.map((cat: Category) => (
            <AspectRatio key={cat._id} ratio={1 / 0.5} className="bg-muted p-2">
              <Link className="flex size-full font-semibold" href={`/bookmark/${cat._id}/${cat.category}`} >{cat.category}</Link>
            </AspectRatio>
          ))}
        <div className="col-span-1 row-span-1 border">
          <div id="new-folder" className="flex items-center justify-center">
            <NewCategoryForm />
          </div>
        </div>
      </div>
    </section>
  )
}
