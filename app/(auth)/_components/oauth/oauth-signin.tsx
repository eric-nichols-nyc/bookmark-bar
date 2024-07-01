"use client"
import { useSignIn } from "@clerk/clerk-react";
import { OAuthStrategy } from "@clerk/types"
import React from "react"
import { Button } from "@/components/ui/button"

const oauthProviders = [
  { name: "Google", strategy: "oauth_google", icon: "google" },
  { name: "Github", strategy: "oauth_github", icon: "github" },
] satisfies {
  name: string
  icon: string
  strategy: OAuthStrategy
}[]

export const OauthSignin = () => {
  const [loading, setLoading] = React.useState<OAuthStrategy | null>(null)
  const {signIn, isLoaded: signInLoaded} = useSignIn()

  async function handleSignIn1(provider: OAuthStrategy) {
    if (!signInLoaded) return null
    setLoading(provider)
    try{
      setLoading(provider)
      await signIn.create({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        actionCompleteRedirectUrl: "/bookmarks",
      })
    }catch(e){
      console.error(e)  
    }

  }

  async function handleSignIn2(provider: OAuthStrategy) {
    if (!signInLoaded) return null
    setLoading(provider)
    try{
      setLoading(provider)
      await signIn.create({
        strategy: "oauth_github",
        redirectUrl: "/bookmarks",
      })
    }catch(e){
      console.error(e)  
    }

  }

  return <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
       {/* {oauthProviders.map((provider) => {
        return (
          <Button
          key={provider.strategy}
          variant="outline"
          className="w-full bg-background"
          onClick={() => void handleSignIn(provider.strategy)}
          disabled={loading !== null}
          >
            {provider.name}
          </Button>
        )
      })} */}
           <Button
          key={"oauth_google"}
          variant="outline"
          className="w-full bg-background"
          onClick={() => void handleSignIn1("oauth_google")}
          disabled={loading !== null}
          >
             <ChromeIcon className="size-5 mr-2" />
            Google
          </Button>
  </div>
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