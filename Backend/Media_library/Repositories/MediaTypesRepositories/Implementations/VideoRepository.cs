using Media_library.Entities.MediaTypes;
using Microsoft.EntityFrameworkCore;

namespace Media_library.Repositories.MediaTypesRepositories;

public class VideoRepository : IVideoRepository
{
    private readonly Context _context;

    public VideoRepository(Context context)
    {
        _context = context;
    }
    public async Task<Video?> GetVideoById(int id)
    {
        var video = await _context.Videos
            .Include(category => category.Category)
            .FirstOrDefaultAsync(v => v.Id == id);
        return video;
    }
    public Task PutVideo(Video video)
    {
        _context.Entry(video).State = EntityState.Modified;
        return _context.SaveChangesAsync();
    }
    public Task PostVideo(Video video)
    {
        _context.Videos.Add(video);
        return _context.SaveChangesAsync();
    }

    public Task DeleteVideo(Video video)
    {
        _context.Videos.Remove(video);
        return _context.SaveChangesAsync();
    }
}