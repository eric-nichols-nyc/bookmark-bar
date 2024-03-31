"use client"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { X } from "lucide-react"
import Image from "next/image"
import * as React from "react"

import { getBookmark, getBookmarkTags, updateBookmark } from "@/actions/bookmarks/bookmark-actions"
import { getCategories } from "@/actions/categories/category-actions"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useShowEditBookmarkForm } from "@/store/useShowEditBookmarkForm"
import { BookmarkData, Category } from "@/types"
import { MSTest } from "../MStest/MStest"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

export function EditDrawer() {
  const [tags, setTags] = React.useState([])
  const [current, setCurrent] = React.useState<BookmarkData | undefined>()
  const [categories, setCategories] = React.useState([])

  const { currentBookmarkId } = useShowEditBookmarkForm((state) => ({ currentBookmarkId: state.currentBookmarkId }))

  const fetchTags = async () => {
    try {
      const tags = await getBookmarkTags()
      return tags
    } catch (e) {
      console.log("error with tags")
    }
  }

  const fetchCategories = async () => {
    try {
      const categories = await getCategories()
      return categories
    } catch (e) {
      console.log("error with categories")
    }
  }

  const fetchCurrent = React.useCallback(async () => {
    try {
      const current = await getBookmark(currentBookmarkId as string)
      setCurrent(current)
    } catch (e) {
      console.log("error with current")
    }
  }, [currentBookmarkId])

  React.useEffect(() => {
    fetchTags().then((tags) => {
      setTags(tags)
    })

    fetchCategories().then((categories) => {
      setCategories(categories)
    })
    fetchCurrent()

    console.log("current", current)
  }, [currentBookmarkId])

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const handleUpdateBookmark = async (data: FormData) => {
    const test = {
      _id: current!._id,
      url: current!.url,
      title: "test",
      description: "test",
      category: "github",
      tags: ["typesrcript","react"],
    }
    // validate data
   console.log(Object.fromEntries(data))
    try{
      await updateBookmark(currentBookmarkId as string, test)
      alert('success')
    }catch(e){
      console.error(e)
    }
  }

  const { show, setToggle } = useShowEditBookmarkForm((state) => ({ show: state.show, setToggle: state.setToggle }))
  if (!current) return <></>
  return (
    <div className="border">
      <Drawer open={show}>
        <DrawerContent className="border">
          <div className="mx-auto flex w-full max-w-sm flex-col">
            <DrawerTitle>Edit Bookmark</DrawerTitle>
            <DrawerHeader>
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  src={current.image || "/images/placeholder.webp"}
                  alt="Photo by Drew Beamer"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </DrawerHeader>

            <form action={handleUpdateBookmark}>
              <Input
                name="title"
                onFocus={(e) => handleOnFocus(e)}
                defaultValue={current.title}
                onChange={() => console.log("change")}
              />
              <Textarea name="description" defaultValue={current.description} onChange={() => console.log("change")} />
              <Select name="category" value={current.category}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((cat: Category) => (
                      <SelectItem key={cat._id} value={cat.category}>
                        {cat.category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <MSTest tags={tags} value={current.tags as []} />

              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline" onClick={() => setToggle(false)}>
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </div>
          <X className="absolute right-3 top-3 cursor-pointer text-black" onClick={() => setToggle(false)} />
        </DrawerContent>
      </Drawer>
    </div>
  )
}
