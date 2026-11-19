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
            .AsSplitQuery()
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
        // Якщо будь-яка зміна не пройде, попередні дані залишаться в БД.
        await using var transaction = await _context.Database.BeginTransactionAsync();

        var updateResult = await _userManager.UpdateAsync(user);

        if (!updateResult.Succeeded)
        {
            throw new ArgumentException(string.Join(" ", updateResult.Errors.Select(error => error.Description)));
        }

        if (!string.IsNullOrEmpty(password))
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var passwordResult = await _userManager.ResetPasswordAsync(user, token, password);

            if (!passwordResult.Succeeded)
            {
                throw new ArgumentException(string.Join(" ", passwordResult.Errors.Select(error => error.Description)));
            }
        }

        await transaction.CommitAsync();
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
            .AsSplitQuery()
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