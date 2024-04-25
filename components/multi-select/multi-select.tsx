"use client"
import { X } from "lucide-react"
import { createContext, useContext, useEffect, useState } from "react"
import { Option } from "@/types"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

type MultiSelectProps = {
  children: React.ReactNode
  placeholder?: string
  label?: string
  onChange: (selected: string[]) => void
}

// displays an input and a list of options
// list shows when input is focused
// div with grid of options and input
const defaultContext = {
  visible: false,
  selected: [] as string[],
  addSelected: (value: string) => console.log(value),
  removeSelected: (value: string) => console.log(value),
  filtered: [] as string[] | undefined,
  setFiltered: (value: string) => console.log(value),
}
export const MultiSelectContext = createContext(defaultContext)

export const useSelectContext = () => useContext(MultiSelectContext)

const MultiSelect = ({ placeholder, onChange, children }: MultiSelectProps) => {
  const [selected, setSelectedItems] = useState<string[]>([])
  const [filtered, setFilteredItems] = useState<string[]>([])
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    onChange(selected)
  }, [selected, onChange])
  // updating the value adds to the selected items array
  const addSelected = (val: string) => {
    setSelectedItems((prev) => [...prev, val])
    setFilteredItems((prev) => [...prev, val])
    setShowOptions((prev) => !prev)
  }

  const removeSelected = (val: string) => {
    // remove value from selected array
    setSelectedItems((prev) => prev.filter((item) => item !== val))
    setFilteredItems((prev) => prev.filter((item) => item !== val))
  }

  const setFiltered = (s: string) => {
    console.log(s)
  }
  return (
    <MultiSelectContext.Provider
      value={{ visible: showOptions, selected, addSelected, removeSelected, setFiltered, filtered }}
    >
      <div className="relative w-full rounded-lg border shadow-sm">
        <div className="grid-cols flex flex-wrap gap-1">
          {selected?.map((option) => (
            <Badge key={option} variant="secondary">
              {option}
              <button onClick={() => removeSelected(option)}>
                <X className="size-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <div>
            <input
              className="p-1 text-sm"
              type="text"
              placeholder={placeholder}
              onFocus={() => setShowOptions(true)}
            />
          </div>
          {showOptions && <div className="absolute top-12 flex w-full flex-col border">{children}</div>}
        </div>
      </div>
    </MultiSelectContext.Provider>
  )
}

const MultiSelectBadge = ({ label }: { label: string }) => {
  const { removeSelected } = useSelectContext()
  return (
    <button className="border" onClick={() => removeSelected(label)}>
      {label} x
    </button>
  )
}

const MultiSelectOption = ({ label, value }: Option) => {
  const { addSelected, filtered } = useSelectContext()

  if (filtered?.includes(value)) return null
  return (
    <Button onClick={() => addSelected(value)} variant="secondary"className="rounded-none cursor-pointer border">
      {label}
    </Button>
  )
}

export { MultiSelect, MultiSelectOption, MultiSelectBadge }
