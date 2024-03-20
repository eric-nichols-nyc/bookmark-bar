export type Option = {
    label: string
    value: string
    disable?: boolean
  }

  // generic type for field errors that takes in a type
export type FieldErrors<T extends object> = {
    [K in keyof T]: string[];
  };

  export type BookmarkError = {
    url?: string[] | undefined;
    category?: string[] | undefined;
  };

  export type BookmarkData = {
    url: string;
    title: string;
    description?: string;
    image?: string;
    category: string;
    tags?: string[];
  };

  export type Category = {
    _id: string;
    category: string;
  };
  
  export type Tag = {
    _id: string;
    name: string;
  };