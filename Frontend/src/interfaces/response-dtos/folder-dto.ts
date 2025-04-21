import { AudioDto } from "../creation-dtos/audio-dto"
import { EbookDto } from "../creation-dtos/ebook-dto"
import { ImageDto } from "../creation-dtos/image-dto"
import { VideoDto } from "../creation-dtos/video-dto"


export interface FolderDto {
    id: number
    name: string
    audios?: AudioDto[]
    ebooks?: EbookDto[]
    images?: ImageDto[]
    videos?: VideoDto[]
}
