"use client"
import React from "react"
import { useToggleForm } from "@/store/useToggleForm"

const EditDrawer = () => {
  const {show, setToggle} = useToggleForm((state) => ({show: state.show, setToggle: state.setToggle}))
  return (
    <>
      {show ? (
        <div onClick={() => setToggle(false)} className="fixed left-0 top-0 flex h-screen w-screen items-end justify-center bg-black/50">
          <div> content</div>
        </div>
      ) : null}
    </>
  )
}

export default EditDrawer
