import Image from 'next/image'
import React from 'react'
import { Navbar } from '@/components/navbar/navbar'
const IntroLayout = ({children}:React.PropsWithChildren) => {
  return (
    <div className="relative h-full bg-cover bg-no-repeat">
        <Navbar />
        <div className="z-10">
        {children}
        </div>

    </div>
  )
}

export default IntroLayout