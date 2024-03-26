import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Category, Tag } from "@/types"

type SelectDemoProps = {
    selected: string,
    cats: Category[]
    }

export function SelectDemo({cats, selected}:SelectDemoProps) {
  return (
    <Select value={selected}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {
                cats.map((cat) => <SelectItem key={cat._id} value={cat.category}>{cat.category}</SelectItem>)
            }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
