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
            Google
          </Button>
          <Button
          key={"oauth_github"}
          variant="outline"
          className="w-full bg-background"
          onClick={() => void handleSignIn2("oauth_github")}
          disabled={loading !== null}
          >
            github
          </Button>
  </div>
}
