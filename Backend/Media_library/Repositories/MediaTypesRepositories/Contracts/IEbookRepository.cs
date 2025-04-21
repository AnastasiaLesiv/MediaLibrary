using Media_library.Entities.MediaTypes;

namespace Media_library.Repositories.MediaTypesRepositories;

public interface IEbookRepository
{
    Task<Ebook?> GetEbookById(int id);
    Task PutEbook(Ebook ebook);
    Task PostEbook(Ebook ebook);
    Task DeleteEbook(Ebook ebook);
}