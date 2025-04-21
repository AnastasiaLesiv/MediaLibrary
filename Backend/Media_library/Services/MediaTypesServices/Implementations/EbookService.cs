using AutoMapper;
using Media_library.Dtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Dtos.UpdateDtos.MediaTypesDtos;
using Media_library.Entities.MediaTypes;
using Media_library.Repositories.MediaTypesRepositories;
using Media_library.Services.MediaTypesServices.Contracts;

namespace Media_library.Services.MediaTypesServices.Implementations;

public class EbookService : IEbookService
{
    private readonly IEbookRepository _ebookRepository;
    private readonly IMapper _mapper;

    public EbookService(IEbookRepository ebookRepository, IMapper mapper)
    {
        _ebookRepository = ebookRepository;
        _mapper = mapper;
    }
    
    public async Task<EbookDto> GetEbookById(int id)
    {
        var returnEbook = _mapper.Map<EbookDto>(await _ebookRepository.GetEbookById(id));
        return await Task.FromResult(returnEbook);
    }

    public async Task PutEbook(int id, UpdateEbookDto? updateEbookDto)
    {
        if (updateEbookDto == null)
        {
            throw new ArgumentNullException(nameof(updateEbookDto));
        }
        
        var ebook = await _ebookRepository.GetEbookById(id);

        if (ebook == null)
        {
            throw new NullReferenceException("Ebook not found");
        }
        
        ebook.Title = updateEbookDto.Title;
        ebook.Author = updateEbookDto.Author;
        ebook.Format = updateEbookDto.Format;
        ebook.PageCount = updateEbookDto.PageCount;
        ebook.CategoryId = updateEbookDto.CategoryId;
        
        await _ebookRepository.PutEbook(ebook);
    }

    public async Task<Ebook> PostEbook(CreateEbookDto createEbookDto)
    {
        if (createEbookDto == null)
        {
            throw new ArgumentNullException(nameof(createEbookDto));
        }

        var entityEbook = new Ebook()
        {
            Title = createEbookDto.Title,
            Author = createEbookDto.Author,
            Format = createEbookDto.Format,
            PageCount = createEbookDto.PageCount,
            UploadDate = createEbookDto.UploadDate,
            CategoryId = createEbookDto.CategoryId,
            UserId = createEbookDto.UserId,
        };
        
        await _ebookRepository.PostEbook(entityEbook);
        
        return entityEbook;
    }
    

    public async Task DeleteEbook(int id)
    {
        var ebook = await _ebookRepository.GetEbookById(id);

        if (ebook == null)
        {
            throw new NullReferenceException("Ebook not found");
        }
        
        await _ebookRepository.DeleteEbook(ebook);
    }
}