import "server-only"

import { currentUser } from "@clerk/nextjs"
import { unstable_noStore as noStore } from "next/cache"
import { cache } from "react"


export const useCacheduser = cache(async () => {
    noStore()
    try {
      return await currentUser()
    } catch (err) {
      console.error(err)
      return null
    }
  })
  