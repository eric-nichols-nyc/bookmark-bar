import { auth } from "@clerk/nextjs"
import { Metadata } from "next"
import { redirect } from "next/navigation"
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



export default async function IntroPage() {
  
  const user = await auth();
  console.log("currentUser: ", user)
  const userId = user?.userId;

  if (userId) redirect("/bookmarks");

  return (
    <section className="flex flex-col items-center justify-center container size-full border">
        <h1 className="text-7xl font-bold">Bookmark Manager</h1>
        <h3 className="text-xl">Effortlessly manage and access all your bookmarks with our intuitive app, keeping your digital world organized and accessible at your fingertips</h3>
        <h3>Streamline your online research and browsing experience with our app, effortlessly organizing all your bookmarks for easy access and efficient navigation.</h3>
    </section>
  )
}
