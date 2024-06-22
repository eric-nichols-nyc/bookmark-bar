import { Folder, Url } from "@prisma/client";

// calculate the position of the element as a number that represents the index of the element in the list
  // the position of the element is first, there are no items before it
  // the position of the element is last, there are no items after it
  // the position of the element is between two other elements and has been moved down for a higher index
  // the position of the element is between two other elements and has been moved up for a lower index
  // return the position of the element

  export const calculatePosition = (index:number, allItems:Folder[] | Url[], item:Folder | Url) => {
    const indexStep = 65536;
    // Remove the item from the list
    const items = allItems.filter(
        (c) =>
          (!(item && item.id === c.id)
      ));
      // Ensure the index is within bounds
      const indexBounded = Math.min(Math.max(index, 0), items.length);
       // Get the previous and next items
      const itemPrev = items[indexBounded - 1];
      const itemNext = items[indexBounded];
      // Get the current item
      const posItemCurr = (item ? item.index : undefined) || -1;
      // Get the index of the previous and next items
      const posItemPrev = itemPrev ? itemPrev.index : -1;
      const posItemNext = itemNext ? itemNext.index : -1;
      // if there is no next item then the new item should be at the end
      if (posItemNext === -1) {
        // Ensure that the new pos comes after the prev card pos
        if (item && posItemCurr > posItemPrev) {
          // it's already after so no need to update
          return posItemCurr;
        } else {
          // the current position is less than the previous position so bump it one past the last item
          return posItemPrev + indexStep;
        }
      } 
      else 
      // if there is a next item
      {
        if (item && posItemCurr > posItemPrev && posItemCurr < posItemNext) {
          return posItemCurr;
        } else if (posItemPrev >= 0) {
          // halve the pos of the next and prev items
          return (posItemNext + posItemPrev) / 2;
        } else {
          // halve the pos of the top item
          return posItemNext / 2;
        }
      }
}
