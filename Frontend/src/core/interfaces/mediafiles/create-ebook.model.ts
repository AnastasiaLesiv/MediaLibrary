export interface CreateEbook {
    title?: string
    author?: string
    format?: string
    resourceUrl?: string | null;
    pageCount?: number
    uploadDate: Date
    categoryId?: number
    userId?: string
}
