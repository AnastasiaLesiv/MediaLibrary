import { Ebook } from "../interfaces/mediafiles/ebook.model";
import { MediaFile } from "../interfaces/mediafiles/media-file.model";
import { Video } from "../interfaces/mediafiles/video.model";
import { Audio } from "../interfaces/mediafiles/audio.model";
import { Image } from "../interfaces/mediafiles/image.model";
import { MediaType } from "../enums/media-type";

export function transformToMediaFileList(audios: Audio[], images: Image[], videos: Video[], ebooks:Ebook[]): MediaFile[] {
    var mediaFileAudios = audios.map(audioToMediaFile);
    var mediaFileImages = images.map(imageToMediaFile);
    var mediaFileVideos = videos.map(videoToMediaFile);
    var mediaFileEbooks = ebooks.map(ebookToMediaFile);

    return [...mediaFileAudios, ...mediaFileImages, ...mediaFileVideos, ...mediaFileEbooks];
  }

function audioToMediaFile(a: Audio): MediaFile {
    var mediaFile: MediaFile = {
      id: a.id,
      author: a.artist,
      categoryName: a.categoryName,
      format: a.format,
      mediaType: MediaType.Audio,
      title: a.title,
      uploadDate: a.uploadDate,
      duration: a.duration
    };
      return mediaFile;
  }

function imageToMediaFile(i: Image): MediaFile{
    var mediaFile: MediaFile = {
      id: i.id,
      author: i.author,
      categoryName: i.categoryName,
      format: i.format,
      mediaType: MediaType.Image,
      title: i.title,
      uploadDate: i.uploadDate,
    };
      return mediaFile;
  }

function videoToMediaFile(v: Video): MediaFile{
    var mediaFile: MediaFile = {
      id: v.id,
      author: v.author,
      categoryName: v.categoryName,
      format: v.format,
      mediaType: MediaType.Video,
      title: v.title,
      uploadDate: v.uploadDate,
      duration: v.duration
    };
      return mediaFile;
  }

function ebookToMediaFile(e: Ebook): MediaFile{
    var mediaFile: MediaFile = {
      id: e.id,
      author: e.author,
      categoryName: e.categoryName,
      format: e.format,
      mediaType: MediaType.Ebook,
      title: e.title,
      uploadDate: e.uploadDate,
      pageCount: e.pageCount
    };
    return mediaFile;
  }