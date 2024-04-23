"use client"
import { Folder, Tag, Url } from "@prisma/client";
import { useState } from "react"
import { handleFetchOpengraph, uploadToCloud } from "@/actions/mongoose/bookmarks/mongoose-actions"
import { addBookmarkSchema } from "@/actions/mongoose/bookmarks/schemas"
import { addBookmark } from "@/actions/prisma/folders/folder-actions";
import { Input } from "@/components/input/input"
import { MultiSelect, MultiSelectOption } from "@/components/multi-select/multi-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select/select"
import { BookmarkData, BookmarkError, FieldErrors } from "@/types"

type FormProps = {
  id?: string
  folders: Folder[] | undefined
  bookmarktags: Tag[]
  defaultValue?:string
}
export const BookmarkForm = ({ id, folders, bookmarktags, defaultValue }: FormProps) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<BookmarkError> | undefined>()

  const [tags, setTags] = useState<string[] | undefined>()
  // add to tags to send to db
  const onTagsChange = (selected: string[]) => {
    setTags(selected)
  }

  const onSubmitAction = async (data: FormData) => {
    const url = data.get("url") as string
    const category = data.get("category")
    const folderId = id || category
    // 1. validate url and category
    const valid = addBookmarkSchema.safeParse({ url, category,folderId })
    let imageUrl
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
            imageUrl = await uploadToCloud(response.image as string)
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
        folderId,
        title: title,
        description: response.description || "",
        imageUrl,
        category,
        tags,
      }
      await addBookmark(data)
      console.log(data)
      alert("Bookmark added")
    } catch (e: any) {
      console.error(e.message)
    }
  }

  const headerText = defaultValue ? `👋 Add a new bookmark to ${defaultValue}`: "👋 Add a new bookmark"

  return (
    <form data-testid="add-form" className="flex flex-col" action={onSubmitAction}>
      <h1 className="mb-2 text-xl font-semibold">{headerText}</h1>
      <Input name="url" placeholder="https://www.example.com" className="mb-2"/>
      {fieldErrors?.url && <p className="text-sm text-red-500">{fieldErrors.url}</p>}
      <div className="flex z-10">
        <div className="flex flex-col gap-2">
          <div className="w-[200px] bg-slate-100 mr-2">
            <Select defaultValue={defaultValue} name="category" onValueChange={(value: string) => console.log(value)}>
              <SelectTrigger>
                <SelectValue placeholder="folder" />
              </SelectTrigger>
              <SelectContent>
                {folders?.map((fld) => (
                  <SelectItem key={fld.id} value={fld.id} className="bg-slate-50 hover:bg-slate-100">
                    {fld.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors?.category && <p className="text-sm text-red-500">{fieldErrors.category}</p>}
          </div>
        </div>
        <div className="w-[300px]">
          {/* <MultiSelect 
            placeholder="Add tags" 
            onChange={onTagsChange}
          >
            {bookmarktags.map((opt) => (
              <MultiSelectOption key={opt.id} label={opt.name} value={opt.name} />
            ))}
          </MultiSelect> */}
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
