
namespace Media_library.Dtos.ResponseDtos;

public class VideoDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Format { get; set; }
    public int Duration { get; set; }
    public DateTime UploadDate { get; set; }
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
}