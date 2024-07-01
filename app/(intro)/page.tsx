import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server"
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
    <section className="flex flex-col items-center justify-center size-full">
      <div className="py-6 w-full border flex flex-col items-center">
        <h1 className="text-3xl font-bold">Organize Your Bookmarks Effortlessly</h1>
        <h3 className="text-xl">Boomarks helps you manage your favorite websites with ease.</h3>
      </div>
      <div className="pt-9 pb-6 flex flex-col items-center border w-full">
        <h3 className="text-2xl font-bold">App features</h3>
        <p className="py-4">Discover the amazing features that make Boomarks yout go-to app for bookmarking.</p>
      <div className="grid grid-cols-3 gap-2">
            <Image
              src="/images/image.png"
              width="200"
              height="300"
              alt="prisma"
              />
            <Image
              src="/images/image1.png"
              width="200"
              height="300"
              alt="clerk"
              />
            <Image
              src="/images/image2.png"
              width="200"
              height="300"
              alt="prisma"
              />
        </div>
      </div>
      <div className="pt-9 flex flex-col items-center border w-full">
        <h3 className="text-2xl font-bold">Get Started</h3>
        <p className="py-4">Start managing your bookmarks with ease. Sign in to get started.</p>
        <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">
          <a href="sign-in">Sign in</a> 
        </Button>
      </div>
    </section>
  )
}
