"use client"

import { useSignUp } from "@clerk/nextjs"
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
export const SignupForm = () => {
  const router = useRouter()

  const [errors, setErrors] = useState<Errors | null>(null)
  const [loading, setLoading] = useState(false)
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    // return () => {
    //     setErrors(null);
    // }
    console.log(errors?.email)
  }, [errors])
  const handleSignup = async (formData: FormData) => {
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
    console.log(email, 'and', password, ' are valid')
    try {
      const result = await signUp.create({
        emailAddress: email,
        password: password,
      })

       
      // send the email.
     await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

     setVerifying(true);

 
      if (result.status === "complete") {
        console.log("Signin complete")
        router.push(`${window.location.origin}/bookmarks`)
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // handle the email verification
    // This function will handle the user submitting a code for verification
    const handleVerify = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isLoaded) return;
   
      try {
        // Submit the code that the user provides to attempt verification
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code
        });
   
        if (completeSignUp.status !== "complete") {
          // The status can also be `abandoned` or `missing_requirements`
          // Please see https://clerk.com/docs/references/react/use-sign-up#result-status for  more information
          console.log(JSON.stringify(completeSignUp, null, 2));
        }
   
        // Check the status to see if it is complete
        // If complete, the user has been created -- set the session active
        if (completeSignUp.status === "complete") {
          await setActive({ session: completeSignUp.createdSessionId });
          // Redirect the user to a post sign-up route
          router.push("/");
        }
      }
      catch (err: any) {
        // This can return an array of errors.
        // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
        console.error('Error:', JSON.stringify(err, null, 2));
      }
    }
  

  if (!isLoaded) {
    <div>Loading...</div>
    return null;
  }

    // Once the sign-up form was submitted, verifying was set to true and as a result, this verification form is presented to the user to input their verification code.
    if (verifying) {
      return (
        <form onSubmit={handleVerify}>
          <label id="code">Code</label>
          <Input value={code} id="code" name="code" onChange={(e) => setCode(e.target.value)} />
          <Button type="submit">Complete Sign Up</Button>
        </form>
      )
    }
    
  
  
  return (
    <form action={handleSignup}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" />
        {errors?.email &&
          errors.email.map((error, index) => (
            <div className="text-red-500" key={index}>
              {error}
            </div>
          ))}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />
        {errors?.password &&
          errors.password.map((error, index) => (
            <div className="text-red-500" key={index}>
              {error}
            </div>
          ))}
      </div>
      <div>
        <Button type="submit">Sign Up</Button>
      </div>
      {errors?.notfound && <div className="text-red-500">{errors.notfound}</div>}
      <div>The current sign-up attempt status is {signUp?.status}.</div>

    </form>
  )
}
