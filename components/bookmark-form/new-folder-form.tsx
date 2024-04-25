import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export const NewFolderForm = () => {
  return (
    <form action="handleSubmit">
        <Label htmlFor="folderName">Folder Name</Label>
        <Input type="text" id="folderName" name="folderName" />
        <Button type="submit">Create Folder</Button>
    </form>
  )
}
