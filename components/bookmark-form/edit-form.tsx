"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useShowEditBookmarkForm } from "@/store/useShowEditBookmarkForm"
import { SelectDemo } from "../category-select/category-select"
import { MSTest } from "../MStest/MStest"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

export function EditDrawer() {
  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const { show, setToggle } = useShowEditBookmarkForm((state) => ({ show: state.show, setToggle: state.setToggle }))

  return (
    <div>
      <Drawer open={show}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm flex flex-col">
            <DrawerTitle>Edit Bookmark</DrawerTitle>
            <DrawerHeader>
              <form>
                <Input name="title" onFocus={(e) => handleOnFocus(e)} value="value here"/>
                <Textarea name="description" value="value here"/>
                <SelectDemo />
                <MSTest />
              </form>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline" onClick={() => setToggle(false)}>
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
