import { getTags } from '@/actions/prisma/folders/folder-actions';
import { getFolders } from '@/actions/prisma/folders/folder-actions';
import { BookmarkForm } from '../bookmark-form/bookmark-form';

async function fetchCategories(){
    try{
      const folders = await getFolders();
      return folders;
    }catch(e){
      console.log('error with categories')
    }
  }
  
  
  async function getUserTags(){
    const tags = await getTags();
    return tags;
  }
  

export const ServerForm = async () => {
    const tags = await getUserTags();
  return (
    <BookmarkForm bookmarktags={tags}/>

  )
}
