using AutoMapper;
using Media_library.Dtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Dtos.UpdateDtos;
using Media_library.Entities;
using Media_library.Repositories;

namespace Media_library.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    
    public UserService(IUserRepository usersRepository, IMapper mapper)
    {
        _userRepository = usersRepository;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<User>> GetUsers()
    {
        return await _userRepository.GetUsers();
    }
    public async Task<UserDto> GetUserById(Guid id)
    {
        var returnUser = _mapper.Map<UserDto>(await _userRepository.GetUserById(id));
        
        return returnUser;
    }
    public async Task PutUser(Guid id, UpdateUserDto? updateUserDto)
    {
        if (updateUserDto == null)
        {
            throw new ArgumentNullException(nameof(updateUserDto));
        }
        
        var user = await _userRepository.GetUserById(id);

        if (user == null)
        {
            throw new NullReferenceException("User could not be found");
        }
            
        user.UserName = updateUserDto.UserName;
        user.FullName = updateUserDto.FullName;
        user.Email = updateUserDto.Email;
        
       await _userRepository.PutUser(user, updateUserDto.Password);
    }
    public async Task<User> PostUser(CreateUserDto createUserDto)
    {
        if (createUserDto == null)
        {
            throw new ArgumentNullException(nameof(createUserDto));
        }
        var entityUser = new User()
        {
            UserName = createUserDto.UserName,
            FullName = createUserDto.FullName,
            Email = createUserDto.Email,
        };

        await _userRepository.PostUser(entityUser, createUserDto.Password);
        
        return entityUser;
    }
    public async Task DeleteUser(Guid id)
    {
        var user = await _userRepository.GetUserById(id);
        
        if (user == null)
        {
            throw new NullReferenceException("User could not be found");
        }
        
        await _userRepository.DeleteUser(user);
    }

    public async Task<UserDto> GetUserOwnData(Guid userId)
    {
        return _mapper.Map<UserDto>(await _userRepository.GetUserOwnData(userId));
    }

    public async Task<IEnumerable<FolderDto?>> GetUserFolders(Guid userId)
    {
        var folders = await _userRepository.GetUserFolders(userId);
        return _mapper.Map<IEnumerable<FolderDto>>(folders);
    }
}