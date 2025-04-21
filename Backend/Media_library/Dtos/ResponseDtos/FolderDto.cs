namespace Media_library.Dtos.ResponseDtos;

public class FolderDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public IEnumerable<AudioDto> Audios { get; set; }
    public IEnumerable<VideoDto> Videos { get; set; }
    public IEnumerable<ImageDto> Images { get; set; }
    public IEnumerable<EbookDto> Ebooks { get; set; }
}