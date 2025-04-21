namespace Media_library.Dtos;

public class CreateAudioDto
{
    public string Title { get; set; }
    public string Artist { get; set; }
    public string Format { get; set; }
    public int Duration { get; set; }
    public DateTime UploadDate { get; set; }
    public int CategoryId { get; set; }
    public Guid UserId { get; set; }
}