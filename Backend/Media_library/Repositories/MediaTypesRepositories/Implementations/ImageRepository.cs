using Media_library.Entities.MediaTypes;
using Microsoft.EntityFrameworkCore;

namespace Media_library.Repositories.MediaTypesRepositories;

public class ImageRepository : IImageRepository
{
    private readonly Context _context;

    public ImageRepository(Context context)
    {
        _context = context;
    }
    
    public async Task<Image?> GetImageById(int id)
    {
        var image = await _context.Images
            .Include(category => category.Category)
            .FirstOrDefaultAsync(image => image.Id == id);
        return image;
    }

    public Task PutImage(Image image)
    {
        _context.Entry(image).State = EntityState.Modified;
         return _context.SaveChangesAsync();
    }

    public Task PostImage(Image image)
    {
        _context.Images.Add(image);
        return _context.SaveChangesAsync();
    }

    public async Task DeleteImage(Image image)
    {
        var folderItems = await _context.FolderItemImages
            .Where(item => item.ImageId == image.Id)
            .ToListAsync();

        _context.FolderItemImages.RemoveRange(folderItems);
        _context.Images.Remove(image);

        await _context.SaveChangesAsync();
    }
}