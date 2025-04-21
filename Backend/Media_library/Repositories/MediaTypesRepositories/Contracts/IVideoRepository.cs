using Media_library.Entities.MediaTypes;

namespace Media_library.Repositories.MediaTypesRepositories;

public interface IVideoRepository
{
    Task<Video?> GetVideoById(int id);
    Task PutVideo(Video video);
    Task PostVideo(Video video);
    Task DeleteVideo(Video video); 
}