using Media_library.Validation;
using System.ComponentModel.DataAnnotations;

namespace Media_library.Dtos.UpdateDtos.MediaTypesDtos;

public class UpdateImageDto
{
    [Required] [StringLength(255)]
    public string Title { get; set; } = string.Empty;

    [Required] [StringLength(150)]
    public string Author { get; set; } = string.Empty;

    [Required] [StringLength(50)]
    public string Format { get; set; } = string.Empty;

    [Range(1, int.MaxValue)]
    public int CategoryId { get; set; }

    [MediaResourceUrl] [MaxLength(2048)]
    public string? ResourceUrl { get; set; }
}