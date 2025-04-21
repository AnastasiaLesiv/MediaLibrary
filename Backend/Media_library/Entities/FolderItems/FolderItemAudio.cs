using System.ComponentModel.DataAnnotations.Schema;
using Media_library.Entities.MediaTypes;

namespace Media_library.Entities.FolderItems;

public class FolderItemAudio
{
    public int FolderId { get; set; }
    public Folder Folder { get; set; }
    public int AudioId { get; set; }
    public Audio Audio { get; set; }
}