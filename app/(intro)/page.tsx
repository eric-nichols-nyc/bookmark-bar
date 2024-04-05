import { currentUser } from "@clerk/nextjs"
import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
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

export default async function IntroPage() {
  const user = await currentUser();
 
  if (user) redirect("/bookmarks");

  // console.log("currentUser: ", user)
  // const categories = await fetchCategories()
  return (
    <section className="flex flex-col items-center justify-center container size-full border">
        <h1 className="text-7xl font-bold">Bookmark Manager</h1>
        <h3 className="text-xl">Effortlessly manage and access all your bookmarks with our intuitive app, keeping your digital world organized and accessible at your fingertips</h3>
        <h3>Streamline your online research and browsing experience with our app, effortlessly organizing all your bookmarks for easy access and efficient navigation.</h3>
      {/* <div className="mx-auto grid max-w-screen-lg grid-flow-row-dense grid-cols-4 grid-rows-4 gap-2 px-4 py-8 sm:py-16 lg:px-6">
        {categories &&
          categories.length > 0 &&
          categories.map((cat: Category) => (
            <AspectRatio key={cat._id} ratio={1 / 0.5} className="bg-muted p-2">
              <Link className="flex size-full font-semibold" href={`/bookmark/${cat._id}/${cat.name}`} >{cat.name}</Link>
            </AspectRatio>
          ))}
        <div className="col-span-1 row-span-1 border">
          <div id="new-folder" className="flex items-center justify-center">
            <NewCategoryForm />
          </div>
        </div>
      </div> */}
    </section>
  )
}
