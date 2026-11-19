using System.ComponentModel.DataAnnotations;

namespace Media_library.Dtos;

public class CreateFolderDto
{
    [Required] [StringLength(100)]
    public string Name { get; set; }
    public Guid UserId { get; set; }
}