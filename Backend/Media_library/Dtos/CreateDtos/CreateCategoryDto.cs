using System.ComponentModel.DataAnnotations;

namespace Media_library.Dtos;

public class CreateCategoryDto
{
    [Required] [StringLength(100)]
    public string CategoryName { get; set; }
}