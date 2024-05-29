"use client";
import { Url } from "@prisma/client";
import { CommandGroup, CommandList } from "cmdk";
import { FileIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandEmpty, CommandInput, CommandItem } from "@/components/ui/command";

type SearchResultsProps = {
    bookmarks: Url[];
};


export function SearchResults({ bookmarks }: SearchResultsProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="outline"
                className="relative flex items-center justify-center sm:w-4 md:w-full"
                onClick={() => setOpen(true)}
            >
                <span className="hidden lg:inline-flex">Search bookmarks...</span>
                <SearchIcon size={18} className="absolute right-3 top-1" />
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="search bookmarks" />
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandList>
                    <CommandGroup title="Bookmarks" className="max-h-[200px] overflow-auto">
                        {bookmarks.map((bookmark:Url) => (
                            <CommandItem key={bookmark.id}>
                                <a rel="noreferrer" href={bookmark.url} target="_blank" className="flex size-full border">  <FileIcon className="mr-2 size-4" />{bookmark.title}</a>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
