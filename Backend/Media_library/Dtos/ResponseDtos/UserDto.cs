using Media_library.Entities;
using Media_library.Entities.MediaTypes;

namespace Media_library.Dtos.ResponseDtos;

public class UserDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public DateTime RegistrationDate { get; set; }
    public IEnumerable<FolderDto> Folders { get; set; }
    public IEnumerable<AudioDto> Audios { get; set; }
    public IEnumerable<VideoDto> Videos { get; set; }
    public IEnumerable<ImageDto> Images { get; set; }
    public IEnumerable<EbookDto> Ebooks { get; set; }
}