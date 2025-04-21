using AutoMapper;
using Media_library.Dtos;
using Media_library.Dtos.FolderItemsDtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Dtos.UpdateDtos;
using Media_library.Entities;
using Media_library.Entities.FolderItems;
using Media_library.Repositories;

namespace Media_library.Services;

public class FolderService : IFolderService
{
    private readonly IFolderRepository _folderRepository;
    private readonly IMapper _mapper;

    public FolderService(IFolderRepository folderRepository, IMapper mapper)
    {
        _folderRepository = folderRepository;
        _mapper = mapper;
    }
    
    public async Task<FolderDto> GetFolderById(int id)
    {
        var folder = await _folderRepository.GetFolderById(id);
        var returnFolder = _mapper.Map<FolderDto>(folder);
        
        return returnFolder;
    }
    public async Task PutFolder(int id, UpdateFolderDto? updateFolderDto)
    {
        if (updateFolderDto == null)
        {
            throw new ArgumentNullException(nameof(updateFolderDto));
        }
        
        var folder  = await _folderRepository.GetFolderById(id);

        if (folder == null)
        {
            throw new NullReferenceException("Folder not found");
        }
        
        folder.Name = updateFolderDto.Name;
        
        await _folderRepository.PutFolder(folder);
    }
    public async Task<Folder> PostFolder(CreateFolderDto createFolderDto)
    {
        if (createFolderDto == null)
        {
            throw new ArgumentNullException(nameof(createFolderDto));
        }
        var entityFolder = new Folder()
        {
            Name = createFolderDto.Name,
            UserId = createFolderDto.UserId,
        };
        
        await _folderRepository.PostFolder(entityFolder);
        
        return entityFolder;
    }
    public async Task DeleteFolder(int id)  
    {
        var folder = await _folderRepository.GetFolderById(id);

        if (folder == null)
        {
            throw new NullReferenceException("Folder not found");
        }
        
        await _folderRepository.DeleteFolder(folder);
    }
    
    public async Task<FolderItemAudio> PostFolderItemAudio(CreateFolderItemAudioDto createFolderItemAudioDto)
    {
        if (createFolderItemAudioDto == null)
        {
            throw new ArgumentNullException(nameof(createFolderItemAudioDto));
        }

        var entityFolderItemAudio = new FolderItemAudio()
        {
            FolderId = createFolderItemAudioDto.FolderId,
            AudioId = createFolderItemAudioDto.AudioId
        };
        
        await _folderRepository.PostFolderItemAudio(entityFolderItemAudio);

        return entityFolderItemAudio;
    }
    public async Task DeleteFolderItemAudio(int folderId, int audioId)
    {
        var folderItemAudio = await _folderRepository.GetFolderItemAudioById(folderId, audioId);
        
        if (folderItemAudio == null)
        {
            throw new NullReferenceException("FolderItemAudio not found");
        }
        await _folderRepository.DeleteFolderItemAudio(folderItemAudio);
    }

    public async Task<FolderItemEbook> PostFolderItemEbook(CreateFolderItemEbookDto createFolderItemEbookDto)
    {
        if (createFolderItemEbookDto == null)
        {
            throw new ArgumentNullException(nameof(createFolderItemEbookDto));
        }

        var entityFolderItemEbook = new FolderItemEbook()
        {
            FolderId = createFolderItemEbookDto.FolderId,
            EbookId = createFolderItemEbookDto.EbookId
        };
        
        await _folderRepository.PostFolderItemEbook(entityFolderItemEbook);
        
        return entityFolderItemEbook;
    }
    public async Task DeleteFolderItemEbook(int folderId, int ebookId)
    {
        var folderItemEbook = await _folderRepository.GetFolderItemEbookById(folderId, ebookId);
        
        if (folderItemEbook == null)
        {
            throw new NullReferenceException("FolderItemEbook not found");
        }
        await _folderRepository.DeleteFolderItemEbook(folderItemEbook);
    }

    public async Task<FolderItemImage> PostFolderItemImage(CreateFolderItemImageDto createFolderItemImageDto)
    {
        if (createFolderItemImageDto == null)
        {
            throw new ArgumentNullException(nameof(createFolderItemImageDto));
        }

        var entityFolderItemImage = new FolderItemImage()
        {
            FolderId = createFolderItemImageDto.FolderId,
            ImageId = createFolderItemImageDto.ImageId
        };
        
        await _folderRepository.PostFolderItemImage(entityFolderItemImage);
        
        return entityFolderItemImage;
    }
    public async Task DeleteFolderItemImage(int folderId, int imageId)
    {
        var folderItemImage = await _folderRepository.GetFolderItemImageById(folderId, imageId);
        
        if (folderItemImage == null)
        {
            throw new NullReferenceException("FolderItemImage not found");
        }
        await _folderRepository.DeleteFolderItemImage(folderItemImage);
    }
    
    public async Task<FolderItemVideo> PostFolderItemVideo(CreateFolderItemVideoDto createFolderItemVideoDto)
    {
        if (createFolderItemVideoDto == null)
        {
            throw new ArgumentNullException(nameof(createFolderItemVideoDto));
        }

        var entityFolderItemVideo = new FolderItemVideo()
        {
            FolderId = createFolderItemVideoDto.FolderId,
            VideoId = createFolderItemVideoDto.VideoId
        };
        
        await _folderRepository.PostFolderItemVideo(entityFolderItemVideo);
        
        return entityFolderItemVideo;
    }
    public async Task DeleteFolderItemVideo(int folderId, int videoId)
    { 
        var folderItemVideo = await _folderRepository.GetFolderItemVideoById(folderId, videoId);
        
        if (folderItemVideo == null)
        {
            throw new NullReferenceException("FolderItemImage not found");
        }
        await _folderRepository.DeleteFolderItemVideo(folderItemVideo);
    }
}