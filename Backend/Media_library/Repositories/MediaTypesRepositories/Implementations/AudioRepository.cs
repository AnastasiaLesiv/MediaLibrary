using Media_library.Entities.MediaTypes;
using Microsoft.EntityFrameworkCore;

namespace Media_library.Repositories.MediaTypesRepositories;

public class AudioRepository : IAudioRepository
{
    private readonly Context _context;

    public AudioRepository(Context context)
    {
        _context = context;
    }
    
    public async Task<Audio?> GetAudioById(int id)
    {
        var audio = await _context.Audios
            .Include(category => category.Category)
            .FirstOrDefaultAsync(audio => audio.Id == id);
        return audio;
    }

    public Task PutAudio(Audio audio)
    {
        _context.Entry(audio).State = EntityState.Modified;
        return _context.SaveChangesAsync();
    }

    public Task PostAudio(Audio audio)
    {
        _context.Audios.Add(audio);
        return _context.SaveChangesAsync();
    }

    public async Task DeleteAudio(Audio audio)
    {
        var folderItems = await _context.FolderItemAudios
            .Where(item => item.AudioId == audio.Id)
            .ToListAsync();

        _context.FolderItemAudios.RemoveRange(folderItems);
        _context.Audios.Remove(audio);

        await _context.SaveChangesAsync();
    }
}