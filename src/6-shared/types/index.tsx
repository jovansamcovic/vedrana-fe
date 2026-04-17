export interface Project {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: Block[] | null;
  category: string | null;
  featured: boolean | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  galleryDesktop: StrapiImage[] | null;
  galleryMobile: StrapiImage[] | null;
  coverImageDesktop: StrapiImage | null;
  coverImageMobile: StrapiImage | null;
  localizations: any[];
}

export interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: any;
  name: string;
}

export interface Block {
  type: string;
  children: BlockChild[];
}

export interface BlockChild {
  type: string;
  text: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
