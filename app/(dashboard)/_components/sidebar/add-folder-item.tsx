"use client";
import { Plus } from "lucide-react"
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { addFolder } from "@/actions/prisma/folders/folder-actions";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function AddFolderItem() {
    const ref = useRef<HTMLFormElement>(null)
    const [open, setOpen] = useState(false)
    const {pending} = useFormStatus()


    const handleSubmit = async (data: FormData) => {
        console.log("submitted", Object.fromEntries(data));
        const name = data.get("folderName") as string
        if (!name) return console.log("no name");
        // send data to server 
        try {
            await addFolder(name)
            console.log('sucess')
            ref.current?.reset()
            setOpen(false)
        } catch (e) {
            console.error(e)
        }
    }



    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full flex justify-between"
                    onClick={() => setOpen(!open)}
                ><span>Add New Folder</span><Plus /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" side="right">
                <form ref={ref} className="flex flex-col gap-3" action={handleSubmit}>
                    <Label htmlFor="folderName">Folder Name</Label>
                    <Input type="text" id="folderName" name="folderName" />
                    <Button
                        type="submit"
                        className="w-full"
                        aria-disabled={pending}
                    >
                        Add Folder
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    )
}
