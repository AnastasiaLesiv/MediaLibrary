
import { Folder } from "../folders/folder.model"
import { Audio } from "../mediafiles/audio.model"
import { Ebook } from "../mediafiles/ebook.model"
import { Image } from "../mediafiles/image.model"
import { Video } from "../mediafiles/video.model"

export interface User {
    id?: number,
    userName?: string,
    fullName?: string,
    email?: string,
    registrationDate?: Date
    folders?: Folder[]
    audios?: Audio[]
    videos?: Video[]
    images?: Image[]
    ebooks?: Ebook[]
}

