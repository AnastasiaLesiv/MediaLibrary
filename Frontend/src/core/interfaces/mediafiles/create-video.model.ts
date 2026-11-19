export interface CreateVideo {
    title?: string
    author?: string
    format?: string
    resourceUrl?: string | null;
    duration?: number
    uploadDate: Date
    categoryId?: number
    userId?: string
}
