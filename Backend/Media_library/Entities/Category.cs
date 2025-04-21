using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Media_library.Entities.MediaTypes;

namespace Media_library.Entities;

public class Category
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string CategoryName { get; set; }
    
    public ICollection<Audio>? Audios { get; set; }
    public ICollection<Video>? Videos { get; set; }
    public ICollection<Ebook>? Ebooks { get; set; }
    public ICollection<Image>? Images { get; set; }
}