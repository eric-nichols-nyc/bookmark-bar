import { UniqueIdentifier } from "@dnd-kit/core";
import { Folder } from "@prisma/client";

// calculate the position of the element as a number that represents the index of the element in the list

export const calculatePosition = (index:number, allItems:Folder[], item:Folder) => {
    const indexStep = 65536;
    const items = allItems.filter(
        (c) =>
          (!(item && item.id === c.id)
      ));
      const indexBounded = Math.min(Math.max(index, 0), items.length);
      const itemPrev = items[indexBounded - 1];
      const itemNext = items[indexBounded];
      const posItemCurr = (item ? item.index : undefined) || -1;
      const posItemPrev = itemPrev ? itemPrev.index : -1;
      const posItemNext = itemNext ? itemNext.index : -1;
    
      if (posItemNext === -1) {
        // Ensure that the new pos comes after the prev card pos
        if (item && posItemCurr > posItemPrev) {
          // it's already after so no need to update
          return posItemCurr;
        } else {
          // bump it one past the last item
          return posItemPrev + indexStep;
        }
      } else {
        if (item && posItemCurr > posItemPrev && posItemCurr < posItemNext) {
          return posItemCurr;
        } else if (posItemPrev >= 0) {
          return (posItemNext + posItemPrev) / 2;
        } else {
          // halve the pos of the top item
          return posItemNext / 2;
        }
      }
}
