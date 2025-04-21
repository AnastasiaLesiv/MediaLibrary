namespace Media_library.Dtos.ResponseDtos;

public class AudioDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Artist { get; set; }
    public string Format { get; set; }
    public int Duration { get; set; }
    public DateTime UploadDate { get; set; }
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
}