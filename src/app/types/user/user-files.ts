type Tag = {
  id: string;
  created_at: string;
  updated_at: string;
  tag_name: string;
};

type View = {
  [key: string]: any;
};

export type UserFile = {
  id: string;
  created_at: string;
  updated_at: string;
  size: number;
  file_name: string;
  file_key: string;
  file_content_type: string;
  file_url: string;
  tags: Tag[];
  views: View[];
  totalViews: number;
};

export type UserFileList = {
  results: UserFile[];
  meta: {
    allTotal: number;
    total: number;
    perPage: number;
    currentPage: number;
  };
};
