using System.ComponentModel.DataAnnotations.Schema;
using Media_library.Entities.MediaTypes;

namespace Media_library.Entities.FolderItems;

public class FolderItemEbook
{
    public int FolderId { get; set; }
    public Folder Folder { get; set; }
    public int EbookId { get; set; }
    public Ebook Ebook { get; set; }
}