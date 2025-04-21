namespace Media_library.Dtos;

public class CreateVideoDto
{
    public string Title { get; set; }
    public string Author { get; set; }
    public string Format { get; set; }
    public int Duration { get; set; }
    public DateTime UploadDate { get; set; }
    public int CategoryId { get; set; }
    public Guid UserId { get; set; }
}