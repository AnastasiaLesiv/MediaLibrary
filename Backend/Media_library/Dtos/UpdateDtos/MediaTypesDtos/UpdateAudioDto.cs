namespace Media_library.Dtos.UpdateDtos.MediaTypesDtos;

public class UpdateAudioDto
{
    public string Title { get; set; }
    public string Artist { get; set; }
    public string Format { get; set; }
    public int Duration { get; set; }
    public int CategoryId { get; set; }
}