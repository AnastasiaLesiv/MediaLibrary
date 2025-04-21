namespace Media_library.Dtos.UpdateDtos.MediaTypesDtos;

public class UpdateEbookDto
{
    public string Title { get; set; }
    public string Author { get; set; }
    public string Format { get; set; }
    public int? PageCount { get; set; }
    public int CategoryId { get; set; }
}