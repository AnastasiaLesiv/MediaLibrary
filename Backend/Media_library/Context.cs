using Microsoft.EntityFrameworkCore;
using Media_library.Entities;
using Media_library.Entities.FolderItems;
using Media_library.Entities.MediaTypes;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Media_library;

public class Context : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{
    public Context(DbContextOptions<Context> options): base(options){}
    public DbSet<Category> Categories { get; set; }
    public DbSet<Folder> Folders { get; set; }
    
    #region Media Types
        public DbSet<Audio> Audios { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Ebook> Ebooks { get; set; }
        public DbSet<Video> Videos { get; set; }
    #endregion
    
    #region Folder Items
        public DbSet<FolderItemEbook> FolderItemEbooks { get; set; }
        public DbSet<FolderItemVideo> FolderItemVideos { get; set; }
        public DbSet<FolderItemImage> FolderItemImages { get; set; }
        public DbSet<FolderItemAudio> FolderItemAudios { get; set; }
    #endregion

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<User>()
            .HasKey(u => u.Id);
        
        modelBuilder.Entity<FolderItemAudio>()
            .HasKey(fia => new { fia.FolderId, fia.AudioId });

        modelBuilder.Entity<FolderItemEbook>()
            .HasKey(fie => new { fie.FolderId, fie.EbookId });

        modelBuilder.Entity<FolderItemImage>()
            .HasKey(fii => new { fii.FolderId, fii.ImageId });

        modelBuilder.Entity<FolderItemVideo>()
            .HasKey(fiv => new { fiv.FolderId, fiv.VideoId });

        #region Folder item relationships

        modelBuilder.Entity<FolderItemAudio>()
            .HasOne(fia => fia.Folder)
            .WithMany(f => f.FolderItemAudios)
            .HasForeignKey(fi => fi.FolderId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<FolderItemAudio>()
            .HasOne(fia => fia.Audio)
            .WithMany(f => f.FolderItemAudios)
            .HasForeignKey(fia => fia.AudioId)
            .OnDelete(DeleteBehavior.NoAction);




        modelBuilder.Entity<FolderItemEbook>()
            .HasOne(fie => fie.Folder)
            .WithMany(f => f.FolderItemEbooks)
            .HasForeignKey(fie => fie.FolderId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<FolderItemEbook>()
            .HasOne(fie => fie.Ebook)
            .WithMany(f => f.FolderItemEbooks)
            .HasForeignKey(fie => fie.EbookId)
            .OnDelete(DeleteBehavior.NoAction);



        modelBuilder.Entity<FolderItemImage>()
            .HasOne(fii => fii.Folder)
            .WithMany(f => f.FolderItemImages)
            .HasForeignKey(fii => fii.FolderId)
            .OnDelete(DeleteBehavior.NoAction);
        

        modelBuilder.Entity<FolderItemImage>()
            .HasOne(fii => fii.Image)
            .WithMany(f => f.FolderItemImages)
            .HasForeignKey(fii => fii.ImageId)
            .OnDelete(DeleteBehavior.NoAction);




        modelBuilder.Entity<FolderItemVideo>()
            .HasOne(fiv => fiv.Folder)
            .WithMany(f => f.FolderItemVideos)
            .HasForeignKey(fiv => fiv.FolderId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<FolderItemVideo>()
            .HasOne(fiv => fiv.Video)
            .WithMany(f => f.FolderItemVideos)
            .HasForeignKey(fiv => fiv.VideoId)
            .OnDelete(DeleteBehavior.NoAction);
        #endregion

        #region MediaType Relationships
        modelBuilder.Entity<Audio>()
            .HasOne(a => a.Category)
            .WithMany(c => c.Audios)
            .HasForeignKey(a => a.CategoryId);

        modelBuilder.Entity<Audio>()
            .HasOne(a => a.User)
            .WithMany(c => c.Audios)
            .HasForeignKey(a => a.UserId);


        modelBuilder.Entity<Ebook>()
            .HasOne(e => e.Category)
            .WithMany(c => c.Ebooks)
            .HasForeignKey(e => e.CategoryId);

        modelBuilder.Entity<Ebook>()
            .HasOne(e => e.User)
            .WithMany(c => c.Ebooks)
            .HasForeignKey(e => e.UserId);



        modelBuilder.Entity<Image>()
            .HasOne(i => i.Category)
            .WithMany(c => c.Images)
            .HasForeignKey(i => i.CategoryId);

        modelBuilder.Entity<Image>()
            .HasOne(i => i.User)
            .WithMany(c => c.Images)
            .HasForeignKey(i => i.UserId);



        modelBuilder.Entity<Video>()
            .HasOne(v => v.Category)
            .WithMany(c => c.Videos)
            .HasForeignKey(v => v.CategoryId);

        modelBuilder.Entity<Video>()
            .HasOne(v => v.User)
            .WithMany(c => c.Videos)
            .HasForeignKey(v => v.UserId);
        #endregion

        modelBuilder.Entity<Folder>()
            .HasOne(a => a.User)
            .WithMany(c => c.Folders)
            .HasForeignKey(a => a.UserId);
    }
    
}
