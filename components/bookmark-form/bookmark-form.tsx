"use client"
import { Folder, Tag, Url } from "@prisma/client";
import { getLogos } from 'favicons-scraper'
import { useParams } from "next/navigation";
import { useRef, useState } from "react"
//import { useFormStatus } from "react-dom";
import { handleFetchOpengraph, uploadToCloud } from "@/actions/prisma/folders/folder-actions"
import { addBookmark } from "@/actions/prisma/folders/folder-actions";
import { addBookmarkSchema } from "@/actions/prisma/folders/schemas"
import { Input } from "@/components/input/input"
// import { MultiSelect, MultiSelectOption } from "@/components/multi-select/multi-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select/select"
import { BookmarkError, FieldErrors } from "@/types"
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useAddingBookmark } from "@/hooks/store/use-adding-bookmark"


type FormProps = {
  id?: string
  folders: Folder[] | undefined
  urls?: Url[] | undefined
  bookmarktags?: Tag[]
  defaultValue?: string
}
export const BookmarkForm = ({ id, folders, bookmarktags, urls, defaultValue }: FormProps) => {
  const {startLoading, stopLoading} = useAddingBookmark((state) => ({startLoading: state.startLoading, stopLoading: state.stopLoading}))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const params = useParams()
  const folder = folders?.find((fld) => fld.id === params.id)?.name 
  // const { pending } = useFormStatus()
  const ref = useRef<HTMLFormElement>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<BookmarkError> | undefined>()

  const [tags, setTags] = useState<string[] | undefined>()
  // add to tags to send to db
  // const onTagsChange = (selected: string[]) => {
  //   setTags(selected)
  // }
  const onSubmitAction = async (data: FormData) => {
    startLoading()
    const url = data.get("url") as string
    const notes = data.get("notes") as string
    const folderId = data.get("category") as string || params.id as string
    
    // if there are urls get the index of the first folder 
    // and add one to the index
    const index = urls?.length ? urls[0].index/2 : 65333

    
    // 1. validate url and category
    const valid = addBookmarkSchema.safeParse({ url, folderId })
    let imageUrl
    let title = "No Title"

    if (!valid.success) {
      console.log(valid.error.flatten().fieldErrors)
      setFieldErrors(valid.error.flatten().fieldErrors)
      return
    }

    let favicon;
    let icon;
    try {
      const domain = url
      const domainLogos = await getLogos(domain)
      favicon = domainLogos[0].src
    } catch (e: any) {
      console.log(e)
    }
    if(favicon) {
      try{
        icon = await uploadToCloud(favicon as string)
        console.log('Icon was created...', icon)
      }catch(e){
        console.log(e)
      }
    }
    // // 1. get url and send to opengraph
    try {
      const response = await handleFetchOpengraph(url as string) as any
      //2. load image title and description
      // of image is returned upload to cloudinary
      if (response.message) {
        console.log('WHOOPS...'+ response.message)
        return
      }
      if (response.image) {
        console.log('image was uploaded',response.image)
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

      const bm = {
        url,
        folderId,
        title: title,
        description: response.description || "",
        imageUrl,
        icon,
        tags,
        notes,
        index
      }
       await addBookmark(bm)
      ref.current?.reset()
      console.log("Bookmark added")
    } catch (e: any) {
      console.error(e.message)
      alert(e.message)
    }finally{
      setIsSubmitting(false)
      stopLoading()
    }
  }

  const headerText = defaultValue ? `👋 Add a new bookmark to ${defaultValue}` : "👋 Add a new bookmark"

  return (
    <form ref={ref} data-testid="add-form" className="flex flex-col pt-4" action={onSubmitAction}>
      <h1 className="mb-2 text-xl font-semibold">{headerText}</h1>
      <Input name="url" placeholder="https://www.example.com" className="mb-2" />
      {fieldErrors?.url && <p className="text-sm text-red-500">{fieldErrors.url}</p>}
      <div>
          <Textarea name="notes" placeholder="Add notes here" className="mb-2" defaultValue=""/>
        </div>
      <div className="flex z-10">
        <div className="flex flex-col gap-2">
          <div className="w-[200px] bg-slate-100 mr-2">
            <Select name="category">
              <SelectTrigger>
                <SelectValue placeholder={folder || "choose a folder"} />
              </SelectTrigger>
              <SelectContent>
                {folders?.map((fld) => (
                  <SelectItem key={fld.id} value={fld.id} className="bg-slate-50 hover:bg-slate-100">
                    {fld.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors?.folderId && <p className="text-sm text-red-500">{fieldErrors.folderId}</p>}
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
   
      </div>
      <div className="flex items-center justify-center w-full p-2">
        <Button
          data-testid="addbookmark-button"
          type="submit"
          className="m-2 border p-2 w-[220px] text-sm"
          onClick={() => setTimeout(() => setIsSubmitting(true),0)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  )
}
