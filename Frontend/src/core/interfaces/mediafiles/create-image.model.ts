export interface CreateImage {
    title?: string
    author?: string
    format?: string
    resourceUrl?: string | null;
    uploadDate: Date
    categoryId?: number
    userId?: string
}
