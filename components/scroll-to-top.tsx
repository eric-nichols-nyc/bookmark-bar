"use client"

import { MouseEvent, useEffect } from "react"
import { Button } from "./ui/button"

const ScrollToTop = () => {
  const scrollFunction = (mybutton: HTMLElement | null) => {
    if (document.getElementById("scroll-container")!.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton!.style.display = "block"
    } else {
      mybutton!.style.display = "none"
    }
  }
  useEffect(() => {
    const mybutton = document.getElementById("myBtn")
    const container = document.getElementById("scroll-container")
    container!.onscroll = () => {
      scrollFunction(mybutton)
    }
  }, [])

  // add an event listener for element with id test scroll

  const scrollToTop = (e:MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    document.getElementById("test")?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
  }

  return (
    <Button id="myBtn" className="fixed bottom-6 right-6" onClick={(e) => scrollToTop(e)}>
      Scroll To Top
    </Button>
  )
}

export default ScrollToTop
