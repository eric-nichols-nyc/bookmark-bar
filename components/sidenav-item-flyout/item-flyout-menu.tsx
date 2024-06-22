import { Url } from '@prisma/client'
import { Bookmark } from "lucide-react";
import Image from 'next/image';
import React from 'react';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Button } from '../ui/button'

type ItemFlyoutMenuProps = {
    bookmark: Url
}

export const ItemFlyoutMenu = ({ bookmark }: ItemFlyoutMenuProps) => {
    const ref = React.useRef<HTMLDivElement>(null)
    // function to return image if icon exists
    const renderImage = () => {
        if (bookmark.icon) {
            return <Image
                width={24}
                height={24}
                src={bookmark ? bookmark.icon : ""}
                alt="favicon"
            />
        } else {
            return <Bookmark />
        }
    }

    const handleOnHover = () => {
        console.log('hovering', ) // change z-index
        ref.current?.style.setProperty('z-index', '500')
    }

    return (
        <div  ref={ref} className="flex flex-1">
        <ContextMenu>
            <ContextMenuTrigger className='w-full'>
                {/* <Button
                    className="flex flex-1 justify-start text-left bg-slate-400 rounded-none w-full"
                    onMouseOver={handleOnHover}
                    onClick={(e) => e.stopPropagation()}
                > */}
                    <a href={bookmark.url} rel="noreferrer" target="_blank" className="flex flex-1 gap-2 ">
                        {renderImage()}
                        {bookmark.title}
                    </a>
                {/* </Button> */}
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={(e)=> e.stopPropagation()}>Delete</ContextMenuItem>
                <ContextMenuItem onClick={(e)=> e.stopPropagation()}>Edit</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
        </div>
    )
}
