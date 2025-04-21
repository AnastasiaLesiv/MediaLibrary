using Media_library.Dtos;
using Media_library.Dtos.FolderItemsDtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Dtos.UpdateDtos;
using Media_library.Entities;
using Media_library.Entities.FolderItems;
using Media_library.Entities.MediaTypes;

namespace Media_library.Services;

public interface IFolderService
{
    Task<FolderDto> GetFolderById(int id);
    Task PutFolder(int id, UpdateFolderDto? updateFolderDto);
    Task<Folder> PostFolder(CreateFolderDto createFolderDto);
    Task DeleteFolder(int id);
    
    Task<FolderItemAudio> PostFolderItemAudio(CreateFolderItemAudioDto createFolderItemAudioDto);
    Task DeleteFolderItemAudio(int folderId, int audioId);
    
    Task<FolderItemEbook> PostFolderItemEbook(CreateFolderItemEbookDto createFolderItemEbookDto);
    Task DeleteFolderItemEbook(int folderId, int ebookId);
    
    Task<FolderItemImage> PostFolderItemImage(CreateFolderItemImageDto createFolderItemImageDto);
    Task DeleteFolderItemImage(int folderId, int imageId);
    
    Task<FolderItemVideo> PostFolderItemVideo(CreateFolderItemVideoDto createFolderItemVideoDto);
    Task DeleteFolderItemVideo(int folderId, int videoId);
}