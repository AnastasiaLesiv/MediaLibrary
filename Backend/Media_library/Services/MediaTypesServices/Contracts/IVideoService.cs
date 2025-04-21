using Media_library.Dtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Dtos.UpdateDtos.MediaTypesDtos;
using Media_library.Entities.MediaTypes;

namespace Media_library.Services.MediaTypesServices.Contracts;

public interface IVideoService
{
    Task<VideoDto> GetVideoById(int id);
    Task PutVideo(int id, UpdateVideoDto? updateVideoDto);
    Task<Video> PostVideo(CreateVideoDto createVideoDto);
    Task DeleteVideo(int id);
}
