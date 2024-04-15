
const BookmarkList = async ({id}:{id: string}) => {
    // const bookmarks = await getBookmarks();
    return (
        <div>
            {/* {bookmarks.map((bookmark) => (
                <Bookmark key={bookmark.id} bookmark={bookmark} />
            ))} */}
            <h1>Bookmark List {id}</h1>
        </div>
    );
}

export default BookmarkList;