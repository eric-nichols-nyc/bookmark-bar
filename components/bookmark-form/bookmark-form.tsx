"use client"
import { useState } from "react"
import { addBookmark, handleFetchOpengraph, uploadToCloud } from "@/actions/bookmarks/bookmark-actions"
import { addBookmarkSchema } from "@/actions/bookmarks/schemas"
import { Input } from "@/components/input/input"
import { MultiSelect, MultiSelectOption } from "@/components/multi-select/multi-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select/select"
import { BookmarkData, BookmarkError, Category, FieldErrors, Tag } from "@/types"

type FormProps = {
  categories: Category[]
  bookmarktags: Tag[]
}
export const BookmarkForm = ({ categories, bookmarktags }: FormProps) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<BookmarkError> | undefined>()

  const [tags, setTags] = useState<string[] | undefined>()
  // add to tags to send to db
  const onTagsChange = (selected: string[]) => {
    setTags(selected)
  }

  const onSubmitAction = async (data: FormData) => {
    const url = data.get("url") as string
    const category = data.get("category")
    // 1. validate url and category
    const valid = addBookmarkSchema.safeParse({ url, category })
    let image
    let title = "No Title"

    if (!valid.success) {
      setFieldErrors(valid.error.flatten().fieldErrors)
      return
    }
    // 1. get url and send to opengraph
    try {
      const response = await handleFetchOpengraph(url as string) as any
      console.log(response)
      //2. load image title and description
      // of image is returned upload to cloudinary
      if (response.message) {
        alert(response.message)
        return
      }
      if (response.image) {
        try {
          if (response.image) {
            image = await uploadToCloud(response.image as string)
          }
        } catch (error: any) {
          console.error("OOPS!!!", error.message)
          return error.message
        }
      } else {
        console.log("no image was found")
      }

      if (response.title) {
        title = response.title
      }

      // add tags and bookmark in db
      const data = {
        url,
        title: title,
        description: response.description || "",
        image,
        category,
        tags,
      } as BookmarkData
      await addBookmark(data)
    } catch (e: any) {
      console.error(e.message)
    }
  }

  return (
    <form className="flex flex-col" action={onSubmitAction}>
      <h1 className="mb-2 text-xl font-semibold">👋 Add a new bookmark</h1>
      <Input name="url" placeholder="https://www.example.com" className="mb-2"/>
      {fieldErrors?.url && <p className="text-sm text-red-500">{fieldErrors.url}</p>}
      <div className="flex z-10">
        <div className="flex flex-col gap-2">
          <div className="w-[200px] bg-slate-100 mr-2">
            <Select name="category" onValueChange={(value: string) => console.log(value)}>
              <SelectTrigger>
                <SelectValue placeholder="category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat.category} className="bg-slate-50 hover:bg-slate-100">
                    {cat.category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors?.category && <p className="text-sm text-red-500">{fieldErrors.category}</p>}
          </div>
        </div>
        <div className="w-[300px]">
          <MultiSelect 
            placeholder="Add tags" 
            onChange={onTagsChange}
          >
            {bookmarktags.map((opt) => (
              <MultiSelectOption key={opt._id} label={opt.name} value={opt.name} />
            ))}
          </MultiSelect>
        </div>
        <div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full p-2">
        <button data-testid="addbookmark-button" type="submit" className="m-2 border p-2 w-[220px] text-sm">
          Add bookmark
        </button>
      </div>
    </form>
  )
}
