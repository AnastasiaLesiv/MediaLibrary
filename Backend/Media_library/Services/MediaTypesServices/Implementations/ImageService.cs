using AutoMapper;
using Media_library.Dtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Dtos.UpdateDtos.MediaTypesDtos;
using Media_library.Entities.MediaTypes;
using Media_library.Repositories.MediaTypesRepositories;
using Media_library.Services.MediaTypesServices.Contracts;

namespace Media_library.Services.MediaTypesServices.Implementations;

public class ImageService : IImageService
{
    private readonly IImageRepository _imageRepository;
    private readonly IMapper _mapper;

    public ImageService(IImageRepository imageRepository, IMapper mapper)
    {
        _imageRepository = imageRepository;
        _mapper = mapper;
    }
    
    public async Task<ImageDto> GetImageById(int id)
    {
        var returnImage = _mapper.Map<ImageDto>(await _imageRepository.GetImageById(id));
        
        return await Task.FromResult(returnImage);
    }

    public async Task PutImage(int id, UpdateImageDto? updateImageDto)
    {
        if (updateImageDto == null)
        {
            throw new ArgumentNullException(nameof(updateImageDto));
        }
        
        var image = await _imageRepository.GetImageById(id);

        if (image == null)
        {
            throw new NullReferenceException("Image not found");
        }
        
        image.Title = updateImageDto.Title;
        image.Author = updateImageDto.Author;
        image.Format = updateImageDto.Format;
        image.CategoryId = updateImageDto.CategoryId;
        
        await _imageRepository.PutImage(image);
    }

    public async Task<Image> PostImage(CreateImageDto createImageDto)
    {
        if (createImageDto == null)
        {
            throw new ArgumentNullException(nameof(createImageDto));
        }

        var entityImage = new Image()
        {
            Title = createImageDto.Title,
            Author = createImageDto.Author,
            Format = createImageDto.Format,
            UploadDate = createImageDto.UploadDate,
            CategoryId = createImageDto.CategoryId,
            UserId = createImageDto.UserId
        };
        
        await _imageRepository.PostImage(entityImage);
        
        return entityImage;
    }

    public async Task DeleteImage(int id)
    {
        var image = await _imageRepository.GetImageById(id);

        if (image == null)
        {
            throw new NullReferenceException("Image not found");
        }
        
        await _imageRepository.DeleteImage(image);
    }
}