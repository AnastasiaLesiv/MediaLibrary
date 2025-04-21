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
                .ThenInclude(i => i.FolderItemAudios)
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
    public async Task PutUser(User user)
    {
        _context.Entry(user).State = EntityState.Modified;
        await _context.SaveChangesAsync();
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
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }
}