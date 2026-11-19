using System.ComponentModel.DataAnnotations;

namespace Media_library.Dtos.UpdateDtos;

public class UpdateUserDto
{
    [Required] [StringLength(256)]
    public string UserName { get; set; } = string.Empty;

    [Required] [StringLength(150)]
    public string FullName { get; set; } = string.Empty;

    [Required] [EmailAddress] [StringLength(256)]
    public string Email { get; set; } = string.Empty;

    public string? Password { get; set; }
}