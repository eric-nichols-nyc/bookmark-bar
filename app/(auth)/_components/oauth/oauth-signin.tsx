"use client"
import { useSignIn } from "@clerk/nextjs"
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

  async function handleSignIn(provider: OAuthStrategy) {
    if (!signInLoaded) return null
    setLoading(provider)
    try{
      setLoading(provider)
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/bookmarks",
      })
    }catch(e){
      console.error(e)  
    }

  }

  return <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
       {oauthProviders.map((provider) => {
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
      })}
  </div>
}
