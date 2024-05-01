"use client"
import { Url } from "@prisma/client";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { getBookmarksByFolderId } from "@/actions/prisma/folders/folder-actions";
import { Button } from "@/components/ui/button";

const BookmarkList = ({ id }: { id: string }) => {
    const [items, setItems] = useState<Url[]>([])
    useEffect(() => {
        const getBookmarks = async () => {
            const bookmarks = await getBookmarksByFolderId(id);
            if (bookmarks)
                setItems(bookmarks);
        }
        getBookmarks();
    }
        , [id])
    return (
        <ul className="flex flex-col w-auto">
            {items?.map((bookmark: Url) => (
                <li 
                    key={bookmark.id}
                    className="flex flex-row w-full justify-start items-center"
                    >
                    <Button 
                        variant="outline" 
                        className="flex flex-1 justify-start text-left bg-slate-400">
                            <Bookmark />{bookmark.title}
                    </Button>
                </li>
            ))}
        </ul>
    );
}

export default BookmarkList;