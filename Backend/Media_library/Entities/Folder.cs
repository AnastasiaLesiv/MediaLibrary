using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Media_library.Entities.FolderItems;

namespace Media_library.Entities;

public class Folder
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; }
    public Guid UserId { get; set; }
    
    //Navigation properties
    public User User { get; set; }
    public ICollection<FolderItemAudio>? FolderItemAudios { get; set; }
    public ICollection<FolderItemVideo>? FolderItemVideos { get; set; }  
    public ICollection<FolderItemImage>? FolderItemImages { get; set; }
    public ICollection<FolderItemEbook>? FolderItemEbooks { get; set; }
}