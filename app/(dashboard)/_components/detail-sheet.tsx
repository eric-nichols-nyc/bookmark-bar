"use client";
import { X } from "lucide-react";
import { useRef } from "react";
import {useClickAway} from 'react-use';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useDetailDrawer } from "@/hooks/store/use-detail-drawer";

type DetailDrawerProps = {
  id: string;
};

export function DetailDrawer({id}: DetailDrawerProps) {
  const ref = useRef(null);
  const {isOpen, toggle} = useDetailDrawer()

  useClickAway(ref, () => {
    toggle()
  });

  return (
    <Sheet open={isOpen}>
      <SheetContent ref={ref}>
      <SheetClose onClick={toggle} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </SheetClose>
        <SheetHeader>
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>
            Description
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            Image
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            Tags
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}