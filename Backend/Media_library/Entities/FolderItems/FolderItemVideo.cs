using System.ComponentModel.DataAnnotations.Schema;
using Media_library.Entities.MediaTypes;

namespace Media_library.Entities.FolderItems;

public class FolderItemVideo
{
    public int FolderId { get; set; }
    public Folder Folder { get; set; }
    public int VideoId { get; set; }
    public Video Video { get; set; }
}