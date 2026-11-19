export interface Video {
    id: number
    title: string
    author: string
    format: string
    resourceUrl?: string | null;
    duration: number
    uploadDate: Date
    categoryId: number
    categoryName: string
}
