using Media_library.Dtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Dtos.UpdateDtos.MediaTypesDtos;
using Media_library.Entities.MediaTypes;

namespace Media_library.Services.MediaTypesServices.Contracts;

public interface IEbookService
{
    Task<EbookDto> GetEbookById(int id);
    Task PutEbook(int id, UpdateEbookDto? updateEbookDto);
    Task<Ebook> PostEbook(CreateEbookDto createEbookDto);
    Task DeleteEbook(int id);
}