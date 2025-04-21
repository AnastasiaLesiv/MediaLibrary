using AutoMapper;
using Media_library.Dtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Dtos.UpdateDtos.MediaTypesDtos;
using Media_library.Entities.MediaTypes;
using Media_library.Repositories.MediaTypesRepositories;
using Media_library.Services.MediaTypesServices.Contracts;

namespace Media_library.Services.MediaTypesServices.Implementations;

public class VideoService : IVideoService
{
    private readonly IVideoRepository _videoRepository;
    private readonly IMapper _mapper;

    public VideoService(IVideoRepository videoRepository, IMapper mapper)
    {
        _videoRepository = videoRepository;
        _mapper = mapper;
    }
    
    public async Task<VideoDto> GetVideoById(int id)
    {
        var returnVideo = _mapper.Map<VideoDto>(await _videoRepository.GetVideoById(id));
        return await Task.FromResult(returnVideo);
    }

    public async Task PutVideo(int id, UpdateVideoDto? updateVideoDto)
    {
        if (updateVideoDto == null)
        {
            throw new ArgumentNullException(nameof(updateVideoDto));
        }
        
        var video = await _videoRepository.GetVideoById(id);

        if (video == null)
        {
            throw new NullReferenceException("Video not found");
        }
        
        video.Title = updateVideoDto.Title;
        video.Author = updateVideoDto.Author;
        video.Format = updateVideoDto.Format;
        video.Duration = updateVideoDto.Duration;
        video.CategoryId = updateVideoDto.CategoryId;
        
        await _videoRepository.PutVideo(video);
    }

    public async Task<Video> PostVideo(CreateVideoDto createVideoDto)
    {
        if (createVideoDto == null)
        {
            throw new ArgumentNullException(nameof(createVideoDto));
        }

        var entityVideo = new Video()
        {
            Title = createVideoDto.Title,
            Author = createVideoDto.Author,
            Format = createVideoDto.Format,
            Duration = createVideoDto.Duration,
            UploadDate = createVideoDto.UploadDate,
            CategoryId = createVideoDto.CategoryId,
            UserId = createVideoDto.UserId
        };
        
        await _videoRepository.PostVideo(entityVideo);
        
        return entityVideo;
    }

    public async Task DeleteVideo(int id)
    {
        var video = await _videoRepository.GetVideoById(id);

        if (video == null)
        {
            throw new NullReferenceException("Video not found");
        }
        
        await _videoRepository.DeleteVideo(video);
    }
}