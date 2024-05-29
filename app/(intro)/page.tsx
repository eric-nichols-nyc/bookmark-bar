import { auth } from "@clerk/nextjs"
import { Metadata } from "next"
import Image from "next/image";
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
        <h1 className="text-7xl font-bold">Webmark</h1>
        <h3 className="text-xl">Effortlessly manage and access all your bookmarks with our intuitive app, keeping your digital world organized and accessible at your fingertips</h3>
        <h3>Streamline your online research and browsing experience with our app, effortlessly organizing all your bookmarks for easy access and efficient navigation.</h3>
        <div className="flex">
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer" className="size-[200px] border">
            <Image
              src="/images/home/next.jpeg"
              width="300"
              height="300"
              alt="prisma"
              />
          </a>
          <a href="https://clerk.com/docs" target="_blank" rel="noreferrer" className="size-[200px] border">
            <Image
              src="/images/home/clerk.png"
              width="300"
              height="300"
              alt="clerk"
              />
          </a>
          <a href="https://www.prisma.io/docs" target="_blank" rel="noreferrer" className="size-[200px] border">
            <Image
              src="/images/home/prisma.jpg"
              width="300"
              height="300"
              alt="prisma"
              />
          </a>

        </div>
    </section>
  )
}
