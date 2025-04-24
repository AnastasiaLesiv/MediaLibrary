using Media_library.Dtos.ResponseDtos;
using Media_library.Entities;

namespace Media_library.Repositories;

public interface IUserRepository
{
    Task<List<User>> GetUsers();
    Task<User?> GetUserById(Guid id);
    Task PutUser(User user, string password);
    Task PostUser(User user, string password);
    Task DeleteUser(User user);
    Task<User?> GetUserOwnData(Guid userId);
    Task<IEnumerable<Folder>> GetUserFolders(Guid userId);
}