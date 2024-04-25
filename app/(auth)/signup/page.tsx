import Link from "next/link"
import { redirect } from "next/navigation";
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useCacheduser } from "@/hooks/useUser";
import { OauthSignin } from '../_components/oauth/oauth-signin'
import { SignupForm } from '../_components/signup/signup-form'

const SignUpPage = async() => {

  const user = await useCacheduser()
  console.log(user)
  if (user) {
    redirect("/bookmarks")
  }
  


  return (
    <section className="flex size-full items-center justify-center border-5 ">
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
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
        <SignupForm />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          <span className="mr-1 hidden sm:inline-block">Already have an account?</span>
          <Link
            aria-label="Sign in"
            href="/sign-in"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  </section>
  )
}

export default SignUpPage