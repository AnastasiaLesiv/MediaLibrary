using Media_library.Entities;
using Media_library.Entities.FolderItems;
using Media_library.Entities.MediaTypes;

namespace Media_library.Repositories;
using Microsoft.EntityFrameworkCore;

public class FolderRepository : IFolderRepository
{
    private readonly Context _context;

    public FolderRepository(Context context)
    {
        _context = context;
    }
    
    public async Task<Folder?> GetFolderById(int id)
    {
        var folder = await _context.Folders
            .Include(f => f.FolderItemAudios)!
                .ThenInclude(i => i.Audio)
                    .ThenInclude(i => i.Category)
            .Include(f => f.FolderItemEbooks)!
                .ThenInclude(i => i.Ebook)
                    .ThenInclude(i => i.Category)
            .Include(f => f.FolderItemImages)!
                .ThenInclude(i => i.Image)
                    .ThenInclude(i => i.Category)
            .Include(f => f.FolderItemVideos)!
                .ThenInclude(i => i.Video)
                    .ThenInclude(i => i.Category)
            .FirstOrDefaultAsync(f => f.Id == id);
        return folder;
    }
    public async Task PutFolder(Folder folder)
    {
        _context.Entry(folder).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
    public async Task PostFolder(Folder folder)
    {
        _context.Folders.Add(folder);
        await _context.SaveChangesAsync();
    }
    public async Task DeleteFolder(Folder folder)
    {
        if(folder.FolderItemAudios.Any())
            foreach (var folderFolderItemAudio in folder.FolderItemAudios)
            {
                _context.FolderItemAudios.Remove(folderFolderItemAudio);
            }

        if(folder.FolderItemEbooks.Any())
            foreach (var folderFolderItemEbook in folder.FolderItemEbooks)
            {
                _context.FolderItemEbooks.Remove(folderFolderItemEbook);
            }

        if(folder.FolderItemImages.Any())
            foreach (var folderFolderItemImage in folder.FolderItemImages)
            {
                _context.FolderItemImages.Remove(folderFolderItemImage); 
            }

        if(folder.FolderItemVideos.Any())
            foreach (var folderFolderItemVideo in folder.FolderItemVideos)
            {
                _context.FolderItemVideos.Remove(folderFolderItemVideo);
            }
        
        _context.Folders.Remove(folder);
        
        await _context.SaveChangesAsync();
    }
    
    public async Task PostFolderItemAudio(FolderItemAudio folderItemAudio)
    {
        _context.FolderItemAudios.Add(folderItemAudio);
        await _context.SaveChangesAsync();
    }
    public async Task<FolderItemAudio?> GetFolderItemAudioById(int folderId, int audioId)
    {
        var folderItemAudio = await _context.FolderItemAudios
            .FirstOrDefaultAsync(fia => fia.FolderId == folderId && fia.AudioId == audioId);
        return folderItemAudio;
    }
    public async Task DeleteFolderItemAudio(FolderItemAudio folderItemAudio)
    {
        _context.FolderItemAudios.Remove(folderItemAudio);
        await _context.SaveChangesAsync();
    }
    
    public async Task PostFolderItemEbook(FolderItemEbook folderItemEbook)
    {
        _context.FolderItemEbooks.Add(folderItemEbook);
        await _context.SaveChangesAsync();
    }
    public async Task<FolderItemEbook?> GetFolderItemEbookById(int folderId, int ebookId)
    {
        var folderItemEbook = await _context.FolderItemEbooks
            .FirstOrDefaultAsync(fie => fie.FolderId == folderId && fie.EbookId == ebookId);
        return folderItemEbook;
    }
    public async Task DeleteFolderItemEbook(FolderItemEbook folderItemEbook)
    {
        _context.FolderItemEbooks.Remove(folderItemEbook);
        await _context.SaveChangesAsync();
    }
    
    public async Task PostFolderItemImage(FolderItemImage folderItemImage)
    {
        _context.FolderItemImages.Add(folderItemImage);
        await _context.SaveChangesAsync();
    }
    public async Task<FolderItemImage?> GetFolderItemImageById(int folderId, int imageId)
    {
        var folderItemImage = await _context.FolderItemImages
            .FirstOrDefaultAsync(fii => fii.FolderId == folderId && fii.ImageId == imageId);
        return folderItemImage;
    }
    public async Task DeleteFolderItemImage(FolderItemImage folderItemImage)
    {
        _context.FolderItemImages.Remove(folderItemImage);
        await _context.SaveChangesAsync();
    }
    
    public async Task PostFolderItemVideo(FolderItemVideo folderItemVideo)
    {
        _context.FolderItemVideos.Add(folderItemVideo);
        await _context.SaveChangesAsync();
    }
    public async Task<FolderItemVideo?> GetFolderItemVideoById(int folderId, int videoId)
    {
        var folderItemVideo = await _context.FolderItemVideos
            .FirstOrDefaultAsync(fiv => fiv.FolderId == folderId && fiv.VideoId == videoId);
        return folderItemVideo;
    }
    public async Task DeleteFolderItemVideo(FolderItemVideo folderItemVideo)
    {
        _context.FolderItemVideos.Remove(folderItemVideo);
        await _context.SaveChangesAsync();
    }
}