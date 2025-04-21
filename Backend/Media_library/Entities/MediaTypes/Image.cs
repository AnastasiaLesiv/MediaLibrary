using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Media_library.Entities.FolderItems;

namespace Media_library.Entities.MediaTypes;

public class Image
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Format { get; set; }
    public DateTime UploadDate { get; set; }
    public int CategoryId { get; set; }
    public Category? Category { get; set; }
    public Guid UserId { get; set; }
    public User? User { get; set; }
    
    public ICollection<FolderItemImage>? FolderItemImages { get; set; }
}