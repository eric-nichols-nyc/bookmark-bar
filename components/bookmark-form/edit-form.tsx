"use client"
import { Folder, Tag, Url } from "@prisma/client"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { X } from "lucide-react"
import Image from "next/image"
import * as React from "react"
import {useClickAway} from 'react-use';
import { getBookmark, getFolders, getTags, updateBookmark } from "@/actions/prisma/folders/folder-actions"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useShowEditBookmarkForm } from "@/hooks/store/useShowEditBookmarkForm"
//import { MSTest } from "../MStest/MStest"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

export function EditSheet() {
  const ref = React.useRef(null);

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
      const current = (await getBookmark(currentBookmarkId as string)) as Url
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
      notes: data.get("notes") as string,
      description: data.get("description") as string,
      folderId: (data.get("category") as string) || current!.folderId,
      tags: tags,
    }
    // validate data
    console.log("obj", obj)
    console.log(Object.fromEntries(data))

    try {
      const update = (await updateBookmark(currentBookmarkId as string, obj)) as any;
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

  const { show, setToggle } = useShowEditBookmarkForm((state) => ({
    show: state.showBookmarkEditDrawer,
    setToggle: state.setToggle,
  }))

  useClickAway(ref, () => {
    setToggle()
  });

  if (!current) return <></>
  return (
    <div className="border">
      <Sheet open={show}>
        <SheetContent className="border sm:max-w-[400px]" ref={ref}>
          <form data-testid="edit-form" action={handleUpdateBookmark}>
            <div className="mx-auto flex gap-2 w-full  flex-col">
              <SheetTitle>Edit Bookmark</SheetTitle>
              <SheetHeader>
                <Label htmlFor="title">Title</Label>
                <Input
                  name="title"
                  onFocus={(e) => handleOnFocus(e)}
                  defaultValue={current.title || ""}
                  onChange={() => console.log("change")}
                />
                <AspectRatio ratio={16 / 9} className="bg-muted">
                  <Image
                    src={current.imageUrl || "/images/placeholder.webp"}
                    alt="Photo by Drew Beamer"
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </SheetHeader>

              <Label>Description</Label>
              <Textarea
                className="h-[150px]"
                name="description"
                defaultValue={current.description || ""}
                onChange={() => console.log("change")}
              />
              <Label>Notes</Label>
              <Textarea
                className="h-[150px]"
                name="notes"
                defaultValue={current?.notes || ""}
                onChange={() => console.log("change")}
              />
              <Label>Folder</Label>
              <Select name="category">
                <SelectTrigger>
                  <SelectValue placeholder={getFolderName(current.folderId)} />
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
              <SheetFooter>
                <Button data-testid="edit">Save</Button>
                <SheetClose asChild>
                  <Button variant="outline" onClick={() => setToggle()}>
                    Cancel
                  </Button>
                </SheetClose>
              </SheetFooter>

              <X className="absolute right-3 top-3 cursor-pointer text-black" onClick={() => setToggle()} />
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
