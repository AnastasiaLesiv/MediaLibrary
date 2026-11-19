export interface Ebook {
    id: number
    title: string
    author: string
    format: string
    resourceUrl?: string | null;
    pageCount: number
    uploadDate: Date
    categoryId: number
    categoryName: string
}
