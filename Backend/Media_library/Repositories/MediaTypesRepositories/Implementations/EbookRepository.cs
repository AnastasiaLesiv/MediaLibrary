using Media_library.Entities.MediaTypes;
using Microsoft.EntityFrameworkCore;

namespace Media_library.Repositories.MediaTypesRepositories;

public class EbookRepository : IEbookRepository
{
    private readonly Context _context;

    public EbookRepository(Context context)
    {
        _context = context;
    }
    
    public async Task<Ebook?> GetEbookById(int id)
    {
        var ebook = await _context.Ebooks
            .Include(category => category.Category)
            .FirstOrDefaultAsync(ebook => ebook.Id == id);
        return ebook;
    }

    public Task PutEbook(Ebook ebook)
    {
        _context.Entry(ebook).State = EntityState.Modified;
        return _context.SaveChangesAsync();
    }

    public Task PostEbook(Ebook ebook)
    {
        _context.Ebooks.Add(ebook);
        return _context.SaveChangesAsync();
    }

    public Task DeleteEbook(Ebook ebook)
    {
        _context.Ebooks.Remove(ebook);
        return _context.SaveChangesAsync();
    }
}