using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Media_library.Entities.MediaTypes;
using Microsoft.AspNetCore.Identity;

namespace Media_library.Entities;

public class User : IdentityUser<Guid>
{
    public DateTime RegistrationDate { get; set; }
    
    [Required]
    public string FullName { get; set; }
    
    //Navigation properties
    public ICollection<Folder>? Folders { get; set; }
    public ICollection<Audio>? Audios { get; set; }
    public ICollection<Video>? Videos { get; set; }
    public ICollection<Image>? Images { get; set; }
    public ICollection<Ebook>? Ebooks { get; set; }
}