DECLARE @UserId uniqueidentifier = 'ed8e8f65-0435-40c8-b2eb-08df42421bbc';

-- 1. Простий запит на вибірку:
-- аудіозаписи користувача.
SELECT Id, Title, Artist, Format, Duration
FROM dbo.Audios
WHERE UserId = @UserId;


-- 2. BETWEEN:
-- аудіозаписи тривалістю від 120 до 300 секунд включно.
SELECT Id, Title, Duration
FROM dbo.Audios
WHERE UserId = @UserId
  AND Duration BETWEEN 120 AND 300;


-- 3. IN:
-- аудіозаписи у вибраних форматах.
SELECT Id, Title, Format
FROM dbo.Audios
WHERE UserId = @UserId
  AND Format IN (N'mp3', N'flac');


-- 4. LIKE:
-- пошук фрагмента назви.
SELECT Id, Title, Artist
FROM dbo.Audios
WHERE UserId = @UserId
  AND Title LIKE N'%Song%';


-- 5. AND:
-- MP3 тривалістю понад дві хвилини.
SELECT Id, Title, Format, Duration
FROM dbo.Audios
WHERE UserId = @UserId
  AND (Format = N'mp3' AND Duration > 120);


-- 6. OR:
-- аудіозаписи у MP3 або тривалістю понад п’ять хвилин.
SELECT Id, Title, Format, Duration
FROM dbo.Audios
WHERE UserId = @UserId
  AND (Format = N'mp3' OR Duration > 300);


-- 7. DISTINCT:
-- перелік різних виконавців.
SELECT DISTINCT Artist
FROM dbo.Audios
WHERE UserId = @UserId
ORDER BY Artist;


-- 8. MIN / MAX:
-- найменша та найбільша тривалість.
SELECT
    MIN(Duration) AS MinDurationSeconds,
    MAX(Duration) AS MaxDurationSeconds
FROM dbo.Audios
WHERE UserId = @UserId;


-- 9. SUM / AVG:
-- загальна та середня тривалість.
SELECT
    SUM(CAST(Duration AS bigint)) AS TotalDurationSeconds,
    AVG(CAST(Duration AS decimal(18, 2))) AS AverageDurationSeconds
FROM dbo.Audios
WHERE UserId = @UserId;


-- 10. COUNT:
-- загальна кількість аудіозаписів.
SELECT COUNT(*) AS AudioCount
FROM dbo.Audios
WHERE UserId = @UserId;


-- 11. Агрегатна функція та кілька полів:
-- кількість записів за категорією і форматом.
SELECT CategoryId, Format, COUNT(*) AS AudioCount
FROM dbo.Audios
WHERE UserId = @UserId
GROUP BY CategoryId, Format;


-- 12. Агрегатна функція та умова WHERE:
-- кількість довгих аудіозаписів за категоріями.
SELECT CategoryId, COUNT(*) AS AudioCount
FROM dbo.Audios
WHERE UserId = @UserId
  AND Duration > 120
GROUP BY CategoryId;


-- 13. Умова на агрегатну функцію:
-- категорії, у яких щонайменше два аудіозаписи.
SELECT CategoryId, COUNT(*) AS AudioCount
FROM dbo.Audios
WHERE UserId = @UserId
GROUP BY CategoryId
HAVING COUNT(*) >= 2;


-- 14. WHERE, HAVING та сортування:
-- категорії зі щонайменше двома довгими записами.
SELECT CategoryId, COUNT(*) AS AudioCount
FROM dbo.Audios
WHERE UserId = @UserId
  AND Duration >= 120
GROUP BY CategoryId
HAVING COUNT(*) >= 2
ORDER BY AudioCount DESC, CategoryId;


-- 15. INNER JOIN:
-- аудіозаписи з назвами категорій.
SELECT a.Id, a.Title, c.CategoryName
FROM dbo.Audios AS a
         INNER JOIN dbo.Categories AS c ON c.Id = a.CategoryId
WHERE a.UserId = @UserId;


-- 16. LEFT JOIN:
-- усі категорії та відповідні аудіозаписи користувача.
-- Категорії без його аудіо також залишаються.
SELECT c.Id AS CategoryId, c.CategoryName, a.Title
FROM dbo.Categories AS c
         LEFT JOIN dbo.Audios AS a
                   ON a.CategoryId = c.Id
                       AND a.UserId = @UserId
ORDER BY c.CategoryName;


-- 17. RIGHT JOIN:
-- усі категорії, включно з категоріями без аудіо користувача.
SELECT c.Id AS CategoryId, c.CategoryName, a.Title
FROM dbo.Audios AS a
         RIGHT JOIN dbo.Categories AS c
                    ON c.Id = a.CategoryId
                        AND a.UserId = @UserId
ORDER BY c.CategoryName;


-- 18. INNER JOIN з умовою:
-- записи тривалістю понад дві хвилини з категоріями.
SELECT a.Title, a.Duration, c.CategoryName
FROM dbo.Audios AS a
         INNER JOIN dbo.Categories AS c ON c.Id = a.CategoryId
WHERE a.UserId = @UserId
  AND a.Duration > 120;


-- 19. INNER JOIN з LIKE:
-- записи з категорій, назви яких містять Rock.
SELECT a.Title, c.CategoryName
FROM dbo.Audios AS a
         INNER JOIN dbo.Categories AS c ON c.Id = a.CategoryId
WHERE a.UserId = @UserId
  AND c.CategoryName LIKE N'%Rock%';


-- 20. INNER JOIN з агрегатною функцією:
-- кількість аудіозаписів у категоріях.
SELECT c.Id, c.CategoryName, COUNT(a.Id) AS AudioCount
FROM dbo.Audios AS a
         INNER JOIN dbo.Categories AS c ON c.Id = a.CategoryId
WHERE a.UserId = @UserId
GROUP BY c.Id, c.CategoryName;


-- 21. INNER JOIN, агрегатна функція та HAVING:
-- категорії зі щонайменше двома записами.
SELECT c.Id, c.CategoryName, COUNT(a.Id) AS AudioCount
FROM dbo.Audios AS a
         INNER JOIN dbo.Categories AS c ON c.Id = a.CategoryId
WHERE a.UserId = @UserId
GROUP BY c.Id, c.CategoryName
HAVING COUNT(a.Id) >= 2;


-- 22. Підзапит з оператором порівняння:
-- записи, довші за перший доданий аудіозапис користувача.
SELECT a.Id, a.Title, a.Duration
FROM dbo.Audios AS a
WHERE a.UserId = @UserId
  AND a.Duration > (
    SELECT TOP (1) firstAudio.Duration
    FROM dbo.Audios AS firstAudio
    WHERE firstAudio.UserId = @UserId
    ORDER BY firstAudio.UploadDate, firstAudio.Id
);


-- 23. Підзапит з агрегатною функцією:
-- записи, довші за середню тривалість.
SELECT a.Id, a.Title, a.Duration
FROM dbo.Audios AS a
WHERE a.UserId = @UserId
  AND a.Duration > (
    SELECT AVG(CAST(other.Duration AS decimal(18, 2)))
    FROM dbo.Audios AS other
    WHERE other.UserId = @UserId
);


-- 24. EXISTS:
-- аудіозаписи, додані хоча б до однієї власної папки.
SELECT a.Id, a.Title
FROM dbo.Audios AS a
WHERE a.UserId = @UserId
  AND EXISTS (
    SELECT 1
    FROM dbo.FolderItemAudios AS fi
             INNER JOIN dbo.Folders AS f ON f.Id = fi.FolderId
    WHERE fi.AudioId = a.Id
      AND f.UserId = @UserId
);


-- 25. ANY:
-- записи, довші хоча б за один власний MP3-запис.
SELECT a.Id, a.Title, a.Duration
FROM dbo.Audios AS a
WHERE a.UserId = @UserId
  AND a.Duration > ANY (
    SELECT other.Duration
    FROM dbo.Audios AS other
    WHERE other.UserId = @UserId
      AND other.Format = N'mp3'
);


-- 26. IN із підзапитом:
-- аудіозаписи категорії Rock.
SELECT a.Id, a.Title, a.Artist
FROM dbo.Audios AS a
WHERE a.UserId = @UserId
  AND a.CategoryId IN (
    SELECT c.Id
    FROM dbo.Categories AS c
    WHERE c.CategoryName = N'Rock'
);


-- 27. Підзапит та INNER JOIN:
-- записи з категорій, де користувач має щонайменше два аудіо.
SELECT a.Id, a.Title, c.CategoryName
FROM dbo.Audios AS a
         INNER JOIN dbo.Categories AS c ON c.Id = a.CategoryId
WHERE a.UserId = @UserId
  AND a.CategoryId IN (
    SELECT other.CategoryId
    FROM dbo.Audios AS other
    WHERE other.UserId = @UserId
    GROUP BY other.CategoryId
    HAVING COUNT(*) >= 2
)
ORDER BY c.CategoryName, a.Title;