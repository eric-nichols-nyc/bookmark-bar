"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { Option } from "@/types"

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
  },[selected, onChange])
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

  const setFiltered = (s:string) => {console.log(s)}
  return (
    <MultiSelectContext.Provider
      value={{ visible: showOptions, selected, addSelected, removeSelected, setFiltered, filtered }}
    >
      <div className="relative w-full rounded-lg border shadow-sm">
        <div className="grid-cols flex flex-wrap gap-2">
          {selected?.map((option) => <MultiSelectBadge key={option} label={option} />)}
          <div>
            <input
              className="border p-1 text-sm"
              type="text"
              placeholder={placeholder}
              onFocus={() => setShowOptions(true)}
            />
          </div>
          {showOptions && <div className="absolute top-11 flex w-full flex-col border">{children}</div>}
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
    <div onClick={() => addSelected(value)} className="cursor-pointer border">
      {label}
    </div>
  )
}

export { MultiSelect, MultiSelectOption, MultiSelectBadge }
