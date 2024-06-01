"use client"

import { useEffect } from "react";
import { Button } from "./ui/button";

const ScrollToTop = () => {

// add an event listener for element with id test scroll


  const scrollToTop = () => {
    document.getElementById('test')?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  return (
    <Button id="myBtn" className="fixed bottom-6 right-6" onClick={scrollToTop}>ScrollToTop</Button>
  )
} 


export default ScrollToTop