"use client"

import { Button } from "./ui/button";

const ScrollToTop = () => {
    const scrollToTop = () => {
        document.getElementById('test')?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
  return (
    <Button onClick={scrollToTop}>ScrollToTop</Button>
  )
}

export default ScrollToTop