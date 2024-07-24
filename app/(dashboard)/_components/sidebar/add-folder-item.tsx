"use client"
import { Plus } from "lucide-react"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { addFolder } from "@/actions/prisma/folders/folder-actions"
import { Button } from "@/components/ui/button"
import { DialogHeader } from "@/components/ui/dialog"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMounted } from "@/hooks/useMounted";
export function AddFolderItem() {
  const router = useRouter()
  const mounted = useMounted()
  const ref = useRef<HTMLFormElement>(null)
  const [open, setOpen] = useState(false)
  const { pending } = useFormStatus()
  // const [text, setText] = useState("")

  // function handleOnEnter(text:any) {
  //   console.log("enter", text)
  // }

  const handleSubmit = async (data: FormData) => {
    const folderName = data.get("folderName") as string
    const index = 66535
    if (!folderName) return console.log("no name")
    // send data to server
    const name = folderName.toLowerCase()

    try {
      const bm = await addFolder({ name, index })
      ref.current?.reset()
      setOpen(false)
      console.log("sucessuffly added folder")
      router.push(`/bookmarks/${bm?.id}`)

    } catch (e) {
      console.error(e)
    }
  }

  if (!mounted) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex w-full justify-between" onClick={() => setOpen(!open)}>
          <span>New Folder</span>
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new folder</DialogTitle>
        </DialogHeader>
        <form ref={ref} className="flex flex-col gap-3" action={handleSubmit}>
        <Label htmlFor="folderName">Folder Name</Label>
        <Input type="text" id="folderName" name="folderName" required/>
        <Button type="submit" className="w-full" aria-disabled={pending}>
          Add Folder
        </Button>
      </form>
      </DialogContent>
    </Dialog>
  )
}
