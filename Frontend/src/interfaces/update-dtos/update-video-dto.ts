export interface UpdateVideoDto {
    id: number
    title: string
    author: string
    format: string
    duration: number
    uploadDate: Date
    categoryId: number
    categoryName: string
}
