using Media_library.Entities.MediaTypes;

namespace Media_library.Repositories.MediaTypesRepositories;

public interface IImageRepository
{
    Task<Image?> GetImageById(int id);
    Task PutImage(Image image);
    Task PostImage(Image image);
    Task DeleteImage(Image image);
}