export interface CreateEbook {
    title?: string
    author?: string
    format?: string
    pageCount?: number
    uploadDate: Date
    categoryId?: number
    userId?: string
}
