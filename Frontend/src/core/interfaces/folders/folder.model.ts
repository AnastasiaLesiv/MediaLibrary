import { Audio } from "../mediafiles/audio.model"
import { Ebook } from "../mediafiles/ebook.model"
import { Image } from "../mediafiles/image.model"
import { Video } from "../mediafiles/video.model"


export interface Folder {
    id: number
    name: string
    audios?: Audio[]
    ebooks?: Ebook[]
    images?: Image[]
    videos?: Video[]
}
