
using Media_library.Entities;
using Media_library.Entities.FolderItems;

namespace Media_library.Repositories;


public interface IFolderRepository
{
    Task<Folder?> GetFolderById(int id);
    Task PutFolder(Folder folder);
    Task PostFolder(Folder folder);
    Task DeleteFolder(Folder folder);
    
    Task PostFolderItemAudio(FolderItemAudio folderItemAudio);
    Task<FolderItemAudio?> GetFolderItemAudioById(int folderId, int audioId);
    Task DeleteFolderItemAudio(FolderItemAudio folderItemAudio);
    
    Task PostFolderItemEbook(FolderItemEbook folderItemEbook);
    Task<FolderItemEbook?> GetFolderItemEbookById(int folderId, int ebookId);
    Task DeleteFolderItemEbook(FolderItemEbook folderItemEbook);
    
    Task PostFolderItemImage(FolderItemImage folderItemImage);
    Task<FolderItemImage?> GetFolderItemImageById(int folderId, int imageId);
    Task DeleteFolderItemImage(FolderItemImage folderItemImage);
    
    Task PostFolderItemVideo(FolderItemVideo folderItemVideo );
    Task<FolderItemVideo?> GetFolderItemVideoById(int folderId, int videoId);
    Task DeleteFolderItemVideo(FolderItemVideo folderItemVideo);
}