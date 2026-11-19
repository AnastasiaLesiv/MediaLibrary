export interface Image {
    id: number
    title: string
    author: string
    format: string
    resourceUrl?: string | null;
    uploadDate: Date
    categoryId: number
    categoryName: string
}
