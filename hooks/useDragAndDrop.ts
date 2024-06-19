import { useState } from "react";


export const useDragAndDrop = () => {
    const [activeId, setActiveId] = useState<string | number | null>(null);
    const [activeItem, setActiveItem] = useState<any | undefined>();
    return {
        activeId,
        setActiveId,
        activeItem,
        setActiveItem
    };
}
