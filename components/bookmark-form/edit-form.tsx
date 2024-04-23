"use client"
import { Folder, Tag, Url } from "@prisma/client"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { X } from "lucide-react"
import Image from "next/image"
import * as React from "react"
import { getBookmark, getFolders, getTags,updateBookmark  } from "@/actions/prisma/folders/folder-actions"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useShowEditBookmarkForm } from "@/store/useShowEditBookmarkForm"
//import { MSTest } from "../MStest/MStest"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

export function EditDrawer() {
  const [tags, setTags] = React.useState<Tag[] | undefined>([])
  const [current, setCurrent] = React.useState<Url | undefined>()
  const [categories, setCategories] = React.useState<Folder[] | undefined>([])

  const { currentBookmarkId } = useShowEditBookmarkForm((state) => ({ currentBookmarkId: state.currentBookmarkId }))

  const fetchTags = async () => {
    try {
      const tags = await getTags()
      return tags
    } catch (e) {
      console.log("error with tags")
    }
  }

  const fetchCategories = async () => {
    try {
      const categories = await getFolders()
      return categories
    } catch (e) {
      console.log("error with categories")
    }
  }

  const fetchCurrent = React.useCallback(async () => {
    try {
      const current = await getBookmark(currentBookmarkId as string) as Url
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

  }, [currentBookmarkId, fetchCurrent])

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const handleUpdateBookmark = async (data: FormData) => {
    const obj = {
      _id: current!.id,
      url: current!.url,
      title: data.get("title") as string,
      description: data.get("description") as string,
      folderId: data.get("category") as string || current!.folderId,
      tags: [],
    }
    // validate data
    console.log('obj', obj)
    console.log(Object.fromEntries(data))

    try {
      const update = await updateBookmark(currentBookmarkId as string, obj) as any
      if (update.error) {
        alert(update.error)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // get current bookmark folder name by select option id
  const getFolderName = (id: string) => {
    const folder = categories?.find((cat) => cat.id === id)
    return folder?.name as string
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
                  src={current.imageUrl || "/images/placeholder.webp"}
                  alt="Photo by Drew Beamer"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </DrawerHeader>

            <form data-testid="edit-form" action={handleUpdateBookmark}>
              <Label htmlFor="title">title</Label>
              <Input
                name="title"
                onFocus={(e) => handleOnFocus(e)}
                defaultValue={current.title || ''}
                onChange={() => console.log("change")}
              />
              <Label>Description</Label>
              <Textarea name="description" defaultValue={current.description || ''} onChange={() => console.log("change")} />
              <Select name="category" defaultValue={getFolderName(current.folderId)} onValueChange={() => console.log('change')}>
                <SelectTrigger>
                  <SelectValue placeholder={getFolderName(current.folderId)}/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories?.map((cat: Folder) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* <MSTest tags={tags} value={current.tags as []} /> */}

              <DrawerFooter>
                <Button data-testid="edit">Submit</Button>
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
