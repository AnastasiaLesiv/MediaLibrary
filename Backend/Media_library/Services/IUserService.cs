using Media_library.Dtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Dtos.UpdateDtos;
using Media_library.Entities;

namespace Media_library.Services;

public interface IUserService
{
   Task<IEnumerable<User>> GetUsers();
   Task<UserDto> GetUserById(Guid id);
   Task PutUser(Guid id, UpdateUserDto? updateUserDto);
   Task<User> PostUser(CreateUserDto createUserDto);
   Task DeleteUser(Guid id);
   
   Task<UserDto> GetUserOwnData(Guid userId);
   Task<IEnumerable<FolderDto?>> GetUserFolders(Guid userId);
}