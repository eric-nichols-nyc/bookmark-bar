import { getBookmarksByCategory } from "@/actions/bookmarks/bookmark-actions";
import BMSection from "@/components/bookmark-section/bookmark-section";
import { BookmarkData } from "@/types";

const fetchBookmarks = async (id:string) => {
    try{
        const bookmarks = await getBookmarksByCategory(id);
        return bookmarks as BookmarkData[];
    }catch(e){
        console.log('error with bookmarks')
    }
}
const BookmarkPage = async(context:{params:{id: string}}) => {
    const id = context.params.id[0]
    const bookmarks = await fetchBookmarks(id)

  return (
    <div>
        <BMSection bookmarks={bookmarks} />
    </div>
  )
}

export default BookmarkPage