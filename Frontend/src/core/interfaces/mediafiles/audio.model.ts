export interface Audio {
    id: number
    title: string
    artist: string
    format: string
    resourceUrl?: string | null;
    duration: number
    uploadDate: Date
    categoryId: number
    categoryName: string
}
