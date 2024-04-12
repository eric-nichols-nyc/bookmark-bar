import Link from "next/link"
import * as React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { OauthSignin } from "../_components/oauth/oauth-signin"
import { SigninForm } from "../_components/signin/signin-form"

export default function SiginPage() {
  return (
    <section className="flex size-full items-center justify-center border-5 ">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Choose your preferred sign up method</CardDescription>
        </CardHeader>
        <CardContent>
          <OauthSignin />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <SigninForm />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">Don&apos;t have an account?</span>
            <Link
              aria-label="Sign up"
              href="/signup"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Sign up
            </Link>
          </div>
          <Link
            aria-label="Reset password"
            href="/signin/reset-password"
            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            Reset password
          </Link>
        </CardFooter>
      </Card>
    </section>
  )
}
