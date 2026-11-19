SET XACT_ABORT ON;

DECLARE @UserId uniqueidentifier = 'ed8e8f65-0435-40c8-b2eb-08df42421bbc';

IF DB_NAME() <> N'MediaLibrary'
    THROW 50001, N'Виберіть базу MediaLibrary.', 1;

IF NOT EXISTS (
    SELECT 1 FROM dbo.AspNetUsers WHERE Id = @UserId
)
    THROW 50002, N'Користувача не знайдено. Перевірте @UserId.', 1;

DECLARE @Demo TABLE (
                        N int PRIMARY KEY,
                        Topic nvarchar(100),
                        CategoryName nvarchar(100)
                    );

INSERT INTO @Demo (N, Topic, CategoryName)
VALUES
    (1,  N'Morning Garden',     N'Ambient'),
    (2,  N'City Lights',        N'Electronic'),
    (3,  N'Mountain Journey',   N'Travel'),
    (4,  N'Ocean Waves',        N'Relaxation'),
    (5,  N'Forest Walk',        N'Wildlife'),
    (6,  N'Evening Piano',      N'Classical'),
    (7,  N'Learning CSharp',    N'Programming'),
    (8,  N'Space Discovery',    N'Astronomy'),
    (9,  N'Family Memories',    N'Family'),
    (10, N'Creative Workshop',  N'Art'),
    (11, N'Healthy Cooking',    N'Cooking'),
    (12, N'Ancient Worlds',     N'History'),
    (13, N'English Practice',   N'Languages'),
    (14, N'Acoustic Session',   N'Acoustic'),
    (15, N'Weekend Adventure',  N'Adventure');

BEGIN TRY
BEGIN TRANSACTION;

    -- Категорії: додаємо тільки відсутні назви.
INSERT INTO dbo.Categories (CategoryName)
SELECT d.CategoryName
FROM @Demo AS d
WHERE NOT EXISTS (
    SELECT 1
    FROM dbo.Categories AS c
    WHERE c.CategoryName = d.CategoryName
);

-- Папки належать користувачу А.
INSERT INTO dbo.Folders (Name, UserId)
SELECT N'Demo Collection - ' + d.Topic, @UserId
FROM @Demo AS d
WHERE NOT EXISTS (
    SELECT 1
    FROM dbo.Folders AS f
    WHERE f.UserId = @UserId
      AND f.Name = N'Demo Collection - ' + d.Topic
);

-- Аудіозаписи.
INSERT INTO dbo.Audios (
    Title, Artist, Format, Duration,
    UploadDate, CategoryId, UserId, ResourceUrl
)
SELECT
    N'Demo Audio - ' + d.Topic,
    N'Demo Artist ' + CAST(d.N AS nvarchar(10)),
    CASE WHEN d.N % 3 = 0 THEN N'flac' ELSE N'mp3' END,
    90 + d.N * 25,
    DATEADD(day, d.N - 1, CAST('2026-10-01' AS datetime2)),
    category.Id,
    @UserId,
    NULL
FROM @Demo AS d
    CROSS APPLY (
        SELECT TOP (1) c.Id
        FROM dbo.Categories AS c
        WHERE c.CategoryName = d.CategoryName
        ORDER BY c.Id
    ) AS category
WHERE NOT EXISTS (
    SELECT 1 FROM dbo.Audios AS a
    WHERE a.UserId = @UserId
  AND a.Title = N'Demo Audio - ' + d.Topic
    );

-- Відеозаписи.
INSERT INTO dbo.Videos (
    Title, Author, Format, Duration,
    UploadDate, CategoryId, UserId, ResourceUrl
)
SELECT
    N'Demo Video - ' + d.Topic,
    N'Demo Studio ' + CAST(d.N AS nvarchar(10)),
    CASE WHEN d.N % 3 = 0 THEN N'webm' ELSE N'mp4' END,
    300 + d.N * 60,
    DATEADD(day, d.N - 1, CAST('2026-10-01' AS datetime2)),
    category.Id,
    @UserId,
    NULL
FROM @Demo AS d
    CROSS APPLY (
        SELECT TOP (1) c.Id
        FROM dbo.Categories AS c
        WHERE c.CategoryName = d.CategoryName
        ORDER BY c.Id
    ) AS category
WHERE NOT EXISTS (
    SELECT 1 FROM dbo.Videos AS v
    WHERE v.UserId = @UserId
  AND v.Title = N'Demo Video - ' + d.Topic
    );

-- Зображення.
INSERT INTO dbo.Images (
    Title, Author, Format,
    UploadDate, CategoryId, UserId, ResourceUrl
)
SELECT
    N'Demo Image - ' + d.Topic,
    N'Demo Photographer ' + CAST(d.N AS nvarchar(10)),
    CASE WHEN d.N % 2 = 0 THEN N'png' ELSE N'jpg' END,
    DATEADD(day, d.N - 1, CAST('2026-10-01' AS datetime2)),
    category.Id,
    @UserId,
    NULL
FROM @Demo AS d
    CROSS APPLY (
        SELECT TOP (1) c.Id
        FROM dbo.Categories AS c
        WHERE c.CategoryName = d.CategoryName
        ORDER BY c.Id
    ) AS category
WHERE NOT EXISTS (
    SELECT 1 FROM dbo.Images AS i
    WHERE i.UserId = @UserId
  AND i.Title = N'Demo Image - ' + d.Topic
    );

-- Електронні книги.
INSERT INTO dbo.Ebooks (
    Title, Author, Format, PageCount,
    UploadDate, CategoryId, UserId, ResourceUrl
)
SELECT
    N'Demo Ebook - ' + d.Topic,
    N'Demo Writer ' + CAST(d.N AS nvarchar(10)),
    CASE WHEN d.N % 2 = 0 THEN N'epub' ELSE N'pdf' END,
    50 + d.N * 20,
    DATEADD(day, d.N - 1, CAST('2026-10-01' AS datetime2)),
    category.Id,
    @UserId,
    NULL
FROM @Demo AS d
    CROSS APPLY (
        SELECT TOP (1) c.Id
        FROM dbo.Categories AS c
        WHERE c.CategoryName = d.CategoryName
        ORDER BY c.Id
    ) AS category
WHERE NOT EXISTS (
    SELECT 1 FROM dbo.Ebooks AS e
    WHERE e.UserId = @UserId
  AND e.Title = N'Demo Ebook - ' + d.Topic
    );

-- Знаходимо створені папки й медіа.
DECLARE @Links TABLE (
                             N int PRIMARY KEY,
                             FolderId int,
                             AudioId int,
                             VideoId int,
                             ImageId int,
                             EbookId int
                         );

INSERT INTO @Links
SELECT d.N, f.Id, a.Id, v.Id, i.Id, e.Id
FROM @Demo AS d
    CROSS APPLY (
        SELECT TOP (1) Id FROM dbo.Folders
        WHERE UserId = @UserId
          AND Name = N'Demo Collection - ' + d.Topic
        ORDER BY Id
    ) AS f
             CROSS APPLY (
        SELECT TOP (1) Id FROM dbo.Audios
        WHERE UserId = @UserId
          AND Title = N'Demo Audio - ' + d.Topic
        ORDER BY Id
    ) AS a
             CROSS APPLY (
        SELECT TOP (1) Id FROM dbo.Videos
        WHERE UserId = @UserId
          AND Title = N'Demo Video - ' + d.Topic
        ORDER BY Id
    ) AS v
             CROSS APPLY (
        SELECT TOP (1) Id FROM dbo.Images
        WHERE UserId = @UserId
          AND Title = N'Demo Image - ' + d.Topic
        ORDER BY Id
    ) AS i
             CROSS APPLY (
        SELECT TOP (1) Id FROM dbo.Ebooks
        WHERE UserId = @UserId
          AND Title = N'Demo Ebook - ' + d.Topic
        ORDER BY Id
    ) AS e;

INSERT INTO dbo.FolderItemAudios (FolderId, AudioId)
SELECT l.FolderId, l.AudioId FROM @Links AS l
WHERE NOT EXISTS (
    SELECT 1 FROM dbo.FolderItemAudios AS fi
    WHERE fi.FolderId = l.FolderId AND fi.AudioId = l.AudioId
);

INSERT INTO dbo.FolderItemVideos (FolderId, VideoId)
SELECT l.FolderId, l.VideoId FROM @Links AS l
WHERE NOT EXISTS (
    SELECT 1 FROM dbo.FolderItemVideos AS fi
    WHERE fi.FolderId = l.FolderId AND fi.VideoId = l.VideoId
);

INSERT INTO dbo.FolderItemImages (FolderId, ImageId)
SELECT l.FolderId, l.ImageId FROM @Links AS l
WHERE NOT EXISTS (
    SELECT 1 FROM dbo.FolderItemImages AS fi
    WHERE fi.FolderId = l.FolderId AND fi.ImageId = l.ImageId
);

INSERT INTO dbo.FolderItemEbooks (FolderId, EbookId)
SELECT l.FolderId, l.EbookId FROM @Links AS l
WHERE NOT EXISTS (
    SELECT 1 FROM dbo.FolderItemEbooks AS fi
    WHERE fi.FolderId = l.FolderId AND fi.EbookId = l.EbookId
);

COMMIT TRANSACTION;
END TRY
BEGIN CATCH
IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    THROW;
END CATCH;