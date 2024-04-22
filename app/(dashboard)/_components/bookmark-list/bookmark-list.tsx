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
        <ul>
            {items?.map((bookmark: Url) => (
                <li key={bookmark.id}><Button variant="outline" className="w-full flex justify-start text-left"><Bookmark />{bookmark.title}</Button></li>
            ))}
        </ul>
    );
}

export default BookmarkList;