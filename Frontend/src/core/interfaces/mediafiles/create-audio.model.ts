export interface CreateAudio{
    title?: string
    artist?: string
    format?: string
    resourceUrl?: string | null;
    duration?: number
    uploadDate: Date
    categoryId?: number
    userId?: string
}