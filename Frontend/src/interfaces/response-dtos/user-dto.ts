
import { FolderDto } from "./folder-dto"
import { AudioDto } from "../creation-dtos/audio-dto"
import { EbookDto } from "../creation-dtos/ebook-dto"
import { ImageDto } from "../creation-dtos/image-dto"
import { VideoDto } from "../creation-dtos/video-dto"

export interface UserDto {
    id?: number,
    name?: string,
    email?: string,
    registrationDate?: Date
    folders?: FolderDto[]
    audios?: AudioDto[]
    videos?: VideoDto[]
    images?: ImageDto[]
    ebooks?: EbookDto[]
}

