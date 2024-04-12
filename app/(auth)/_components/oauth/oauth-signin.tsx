"use client"
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
  return <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
       {oauthProviders.map((provider) => {
        return (
          <Button
            key={provider.strategy}
            onClick={() => {
              console.log(provider.strategy)
            }}
          >
            {provider.name}
          </Button>
        )
      })}
  </div>
}
