"use client"

import { useSession } from "@clerk/clerk-react";
import { useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../../../components/ui/button"
import { SigninForm } from "../_components/sign-in/signin-form"

export default function OauthSignIn() {
  const router = useRouter()
  const { signIn } = useSignIn()
  const { isLoaded, session, isSignedIn } = useSession();
  console.log('signIn ', signIn)

  if (isSignedIn){
    console.log('User is signed in')
    router.push('/bookmarks')
  }

  const signInWithGoogle = () => {
    return signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    })
  }

  const signInWithGithub = () => {
    return signIn?.authenticateWithRedirect({
      strategy: "oauth_github",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    })
  }

  // Render a button for each supported OAuth provider
  // you want to add to your app. This example uses only Google.
  return (
    <div className="mt-10 flex justify-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Choose your preferred sign in method</CardDescription>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-none" onClick={() => signInWithGoogle()}><ChromeIcon className="size-5 mr-2" />
            Sign in with Google</Button>
            <Button variant="outline" className="rounded-none" onClick={() => signInWithGithub()}><GitlabIcon className="size-5 mr-2" />Sign in with Github</Button>
          </div>
          <p>or continue with</p>
          <SigninForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  )
}
function ChromeIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}

function GitlabIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
    </svg>
  )
}