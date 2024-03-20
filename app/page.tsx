import { Metadata } from "next"
import { getBookmarkTags } from "@/actions/bookmarks/bookmark-actions";
import { getCategories } from "@/actions/categories/category-actions";
import { BookmarkForm } from "@/components/bookmark-form/bookmark-form"
import { BookmarkList } from "@/components/bookmark-list/bookmark-list"

export const metadata: Metadata = {
  title: "Bookmark Manager - save and organize your bookmarks",
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

async function fetchCategories(){
  const categories = await getCategories();
  return categories;
}


async function getTags(){
  const tags = await getBookmarkTags();
  return tags;
}

export default async function Web() {
  const categories = await fetchCategories();
  const tags = await getTags();
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:py-16 lg:px-6">
          <BookmarkForm categories={categories} bookmarktags={tags}/>
          <BookmarkList categories={categories} />
        </div>
      </section>
    </>
  )
}
