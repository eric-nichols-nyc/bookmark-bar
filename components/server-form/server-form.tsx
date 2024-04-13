import { getBookmarkTags } from '@/actions/bookmarks/bookmark-actions';
import { getCategories } from '@/actions/folders/folder-actions';
import { BookmarkForm } from '../bookmark-form/bookmark-form';

async function fetchCategories(){
    try{
      const categories = await getCategories();
      return categories;
    }catch(e){
      console.log('error with categories')
    }
  }
  
  
  async function getTags(){
    const tags = await getBookmarkTags();
    return tags;
  }
  

export const ServerForm = async () => {
    const categories = await fetchCategories();
    const tags = await getTags();
  return (
    <BookmarkForm categories={categories} bookmarktags={tags}/>

  )
}
