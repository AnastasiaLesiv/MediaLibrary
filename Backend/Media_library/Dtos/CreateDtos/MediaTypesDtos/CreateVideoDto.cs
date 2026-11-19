using Media_library.Validation;
using System.ComponentModel.DataAnnotations;

namespace Media_library.Dtos;

public class CreateVideoDto
{
    [Required] [StringLength(255)]
    public string Title { get; set; }
    
    [Required] [StringLength(150)]
    public string Author { get; set; }
    
    [Required] [StringLength(50)]
    public string Format { get; set; }
    
    [Range(1, int.MaxValue)]
    public int Duration { get; set; }
    public DateTime UploadDate { get; set; }
    
    [Range(1, int.MaxValue)]
    public int CategoryId { get; set; }
    public Guid UserId { get; set; }
    
    [MediaResourceUrl] [MaxLength(2048)]
    public string? ResourceUrl { get; set; }
}