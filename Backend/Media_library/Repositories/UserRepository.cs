using Media_library.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Media_library.Repositories;

public class UserRepository : IUserRepository
{
    private readonly Context _context;
    private readonly UserManager<User> _userManager;

    public UserRepository(Context context, UserManager<User> userManager)
    {
        _userManager = userManager;
        _context = context;
    }
    
    public async Task<List<User>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }
    public async Task<User?> GetUserById(Guid id)
    {
        var user = await _context.Users
            .Include(f => f.Folders)
                .ThenInclude(f => f.FolderItemAudios)
            .Include(f => f.Folders)
                .ThenInclude(f => f.FolderItemEbooks)
            .Include(f => f.Folders)
                .ThenInclude(i => i.FolderItemVideos)
            .Include(f => f.Folders)
                .ThenInclude(i => i.FolderItemImages)
            .Include(u => u.Audios)!
                .ThenInclude(i => i.Category)
            .Include(u => u.Ebooks)!
                .ThenInclude(i => i.Category)
            .Include(u => u.Images)!
                .ThenInclude(i => i.Category)
            .Include(u => u.Videos)!
                .ThenInclude(i => i.Category)
            .FirstOrDefaultAsync(u => u.Id == id);
        
        return user;
    }
    public async Task PutUser(User user, string password)
    {
        var updateResult = await _userManager.UpdateAsync(user);
        if (!updateResult.Succeeded)
        {
            throw new Exception(updateResult.Errors.First().Description);
        }
        
        if (!string.IsNullOrEmpty(password))
        {
            // Видаляємо старий пароль
            var removePasswordResult = await _userManager.RemovePasswordAsync(user);
            if (!removePasswordResult.Succeeded)
            {
                throw new Exception(removePasswordResult.Errors.First().Description);
            }

            // Додаємо новий пароль
            var addPasswordResult = await _userManager.AddPasswordAsync(user, password);
            if (!addPasswordResult.Succeeded)
            {
                throw new Exception(addPasswordResult.Errors.First().Description);
            }
        }
    }
    public async Task PostUser(User user, string password)
    {
        var result = await _userManager.CreateAsync(user, password);

        if (!result.Succeeded)
        {
            throw new Exception(result.Errors.First().Description);
        }
    }
    public async Task DeleteUser(User user)
    {
        foreach (var folder in user.Folders)
        {
            if (folder.FolderItemAudios.Any())
                foreach (var folderFolderItemAudio in folder.FolderItemAudios)
                {
                    _context.FolderItemAudios.Remove(folderFolderItemAudio);
                }

            if (folder.FolderItemEbooks.Any())
                foreach (var folderFolderItemEbook in folder.FolderItemEbooks)
                {
                    _context.FolderItemEbooks.Remove(folderFolderItemEbook);
                }

            if (folder.FolderItemImages.Any())
                foreach (var folderFolderItemImage in folder.FolderItemImages)
                {
                    _context.FolderItemImages.Remove(folderFolderItemImage);
                }

            if (folder.FolderItemVideos.Any())
                foreach (var folderFolderItemVideo in folder.FolderItemVideos)
                {
                    _context.FolderItemVideos.Remove(folderFolderItemVideo);
                }
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }

    public async Task<User?> GetUserOwnData(Guid userId)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
    }

    public async Task<IEnumerable<Folder>> GetUserFolders(Guid userId)
    {
        return await _context.Folders
            .Include(f => f.FolderItemAudios)
                .ThenInclude(fa => fa.Audio)
            .Include(f => f.FolderItemEbooks)
                .ThenInclude(fe => fe.Ebook)
            .Include(f => f.FolderItemImages)
                .ThenInclude(fi => fi.Image)
            .Include(f => f.FolderItemVideos)
                .ThenInclude(fv => fv.Video)
            .Where(f => f.UserId == userId).ToListAsync();
    }
}