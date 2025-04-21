using System.ComponentModel.DataAnnotations.Schema;
using Media_library.Entities.MediaTypes;

namespace Media_library.Entities.FolderItems;

public class FolderItemImage
{
    public int FolderId { get; set; }
    public Folder Folder { get; set; }
    public int ImageId { get; set; }
    public Image Image { get; set; }
}