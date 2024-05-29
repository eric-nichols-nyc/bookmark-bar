import React, { createContext, useContext, useMemo } from "react";
import type { CSSProperties, PropsWithChildren } from "react";
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    id: UniqueIdentifier;
  }
  
  interface Context {
    attributes: Record<string, any>;
    listeners: DraggableSyntheticListeners;
    ref(node: HTMLElement | null): void;
  }
  
  const SortableItemContext = createContext<Context>({
    attributes: {},
    listeners: undefined,
    ref() {}
  });


export const SortableListItem = ({ children, id }: PropsWithChildren<Props>) => {
    const {      
        isDragging,
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: id});
    
  return (
    <li
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
            transform: CSS.Transform.toString(transform),
            transition: transition || undefined,
        }}
        className="flex items-center justify-between px-4 py-3 bg-gray-200 rounded-none"
    >
        {children}
    </li>
  )
}
