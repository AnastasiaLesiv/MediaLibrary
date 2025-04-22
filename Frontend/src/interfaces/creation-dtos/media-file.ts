import { MediaType } from "../../core/enums/media-type"

export interface MediaFile {
    id: number
    title: string
    author: string
    format: string
    duration?: number
    pageCount?: number
    uploadDate: Date
    categoryName: string
    mediaType: MediaType
}
