using Media_library.Entities;

namespace Media_library.Repositories;

public interface IUserRepository
{
    Task<List<User>> GetUsers();
    Task<User?> GetUserById(Guid id);
    Task PutUser(User user);
    Task PostUser(User user, string password);
    Task DeleteUser(User user);
}