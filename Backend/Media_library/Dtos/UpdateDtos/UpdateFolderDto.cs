using System.ComponentModel.DataAnnotations;

namespace Media_library.Dtos.UpdateDtos;

public class UpdateFolderDto
{
    [Required] [StringLength(100)]
    public string Name { get; set; } = string.Empty;
}