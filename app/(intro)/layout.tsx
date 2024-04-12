import Image from 'next/image'
import React from 'react'
import { Navbar } from '@/components/navbar/navbar'
const IntroLayout = ({children}:React.PropsWithChildren) => {
  return (
    <div className="relative border h-full bg-cover bg-no-repeat" style={{backgroundImage:"url(/images/image0_0.jpg)"}}>
        <Navbar />
        <div className="z-10">
        {children}
        </div>

    </div>
  )
}

export default IntroLayout