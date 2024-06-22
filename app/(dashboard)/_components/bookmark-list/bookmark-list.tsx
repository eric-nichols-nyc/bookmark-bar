"use client"
import { Url } from "@prisma/client";
import { useEffect, useState } from "react";
import { getBookmarksByFolderId } from "@/actions/prisma/folders/folder-actions";
import { ItemFlyoutMenu } from "@/components/sidenav-item-flyout/item-flyout-menu";
import { useFlyoutStore } from "@/hooks/store/useFlyoutStore";

const BookmarkList = ({ id }: { id: string }) => {
    const close = useFlyoutStore((state) => state.toggle);

    const [items, setItems] = useState<Url[]>([])
    useEffect(() => {
        const getBookmarks = async () => {
            const bookmarks = await getBookmarksByFolderId(id);
            if (bookmarks)
                setItems(bookmarks);
        }
        getBookmarks();
    }, [id])
    
    return (
        <div onMouseLeave={() => close()}>
            <ul className="flex flex-col w-auto">
                {items?.map((bookmark: Url) => (
                    <li
                        key={bookmark.id}
                        className="flex flex-row w-full justify-start items-center"
                    >
                        <ItemFlyoutMenu bookmark={bookmark} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookmarkList;