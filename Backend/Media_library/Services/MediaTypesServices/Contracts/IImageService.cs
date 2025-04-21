using Media_library.Dtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Dtos.UpdateDtos.MediaTypesDtos;
using Media_library.Entities.MediaTypes;

namespace Media_library.Services.MediaTypesServices.Contracts;

public interface IImageService
{
    Task<ImageDto> GetImageById(int id);
    Task PutImage(int id, UpdateImageDto? updateImageDto);
    Task<Image> PostImage(CreateImageDto createImageDto);
    Task DeleteImage(int id);
}