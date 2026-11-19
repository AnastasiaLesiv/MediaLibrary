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

    public async Task DeleteVideo(Video video)
    {
        var folderItems = await _context.FolderItemVideos
            .Where(item => item.VideoId == video.Id)
            .ToListAsync();

        _context.FolderItemVideos.RemoveRange(folderItems);
        _context.Videos.Remove(video);

        await _context.SaveChangesAsync();
    }
}