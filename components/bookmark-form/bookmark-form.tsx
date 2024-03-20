"use client"
import { useState } from "react"
import { Input } from "@/components/input/input"
import { MultiSelect, MultiSelectOption } from "@/components/multi-select/multi-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select/select"

export type Option = {
  label: string
  value: string
  disable?: boolean
}
const OPTIONS: Option[] = [
  { label: "nextjs", value: "nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Ember", value: "ember", disable: true },
  { label: "Gatsby", value: "gatsby", disable: true },
  { label: "Astro", value: "astro" },
]
export const BookmarkForm = () => {

    const [tags, setTags] = useState<string[] | undefined>()
  // add to tags to send to db
  const onTagsChange = (selected: string[]) => {
    console.log("tag to add in form", selected)
    setTags(selected)
  }

  const onSubmitAction = () => {
    console.log("submit action called", tags)
  }

  return (
    <form className="flex flex-col" action={onSubmitAction}>
      <h1 className="text-xl mb-2 font-semibold">👋 Add a new bookmark</h1>
      <Input placeholder="https://www.example.com" />
      <div className="flex gap-2">
        <div className="w-[120px] bg-slate-100">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="c1" className="bg-slate-50 hover:bg-slate-100">
                Category 1
              </SelectItem>
              <SelectItem value="c2" className="bg-slate-50">
                Category 2
              </SelectItem>
              <SelectItem value="c3" className="bg-slate-50">
                Category 3
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[300px] bg-slate-100">
          <MultiSelect placeholder="Add tags" onChange={onTagsChange}>
            {OPTIONS.map((opt) => (
              <MultiSelectOption key={opt.value} label={opt.label} value={opt.value} />
            ))}
          </MultiSelect>
        </div>
      </div>
      <button type="submit"className="border">Add bookmark</button>
    </form>
  )
}
