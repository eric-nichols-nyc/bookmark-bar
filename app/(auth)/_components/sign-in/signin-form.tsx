"use client"

import { useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { loginSchema } from "@/actions/auth/schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Errors = {
  email?: string[]
  password?: string[]
  notfound?: string
}
export const SigninForm = () => {
  const router = useRouter()

  const { isLoaded, signIn, setActive } = useSignIn()

  const [errors, setErrors] = useState<Errors | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // return () => {
    //     setErrors(null);
    // }
    console.log('ERR ', errors)
  }, [errors])

  useEffect(() => {
    // return () => {
    //     setLoading(false);
    // }
    console.log('LOADING ', loading)
  } , [loading])

  const handleSignin = async (formData: FormData) => {
    if (!isLoaded) return

    setLoading(true)
    setErrors(null)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    console.log(email, password)
    // validate email and password with zod
    const valid = loginSchema.safeParse({ email, password })
    if (!valid.success) {
      console.error(valid.error.flatten().fieldErrors)
      setErrors(valid.error.flatten().fieldErrors)
      return
    }
    // call signin function
    // ebn646@gmail.com / pw: 8idLdojfuFqA7Y
    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      })
      console.log('result ', result)

      if (result.status === "complete") {
        console.log("Signin complete")
        setActive({ session: result.createdSessionId })
        router.push('/bookmarks')
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result)
      }
    } catch (err: any) {
      console.error("OOPS Errors", err.errors[0].message)
      setErrors((prev) => ({
        ...prev, // Copy the old fields
        notfound: err.errors[0].message, // But override this one
      }))
    } finally {
      setLoading(false)
    }
  }
  return (
    <form action={handleSignin}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input data-testid="email" type="email" id="email" name="email" value="test@test.com" />
        {errors?.email &&
          errors.email.map((error, index) => (
            <div className="text-red-500" key={index}>
              {error}
            </div>
          ))}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input data-testid="password"  type="password" id="password" name="password" value="12345678"/>
        {errors?.password &&
          errors.password.map((error, index) => (
            <div className="text-red-500" key={index}>
              {error}
            </div>
          ))}
      </div>
      <Button data-testid="login-button" type="submit" className="mt-2 w-full">Sign In</Button>
      {errors?.notfound && <div className="text-red-500">{errors.notfound}</div>}
    </form>
  )
}
