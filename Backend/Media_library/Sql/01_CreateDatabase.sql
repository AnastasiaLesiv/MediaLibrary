IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
CREATE TABLE [AspNetRoles] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(256) NULL,
    [NormalizedName] nvarchar(256) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetRoles] PRIMARY KEY ([Id])
);

CREATE TABLE [AspNetUsers] (
    [Id] uniqueidentifier NOT NULL,
    [RegistrationDate] datetime2 NOT NULL,
    [UserName] nvarchar(256) NULL,
    [NormalizedUserName] nvarchar(256) NULL,
    [Email] nvarchar(256) NULL,
    [NormalizedEmail] nvarchar(256) NULL,
    [EmailConfirmed] bit NOT NULL,
    [PasswordHash] nvarchar(max) NULL,
    [SecurityStamp] nvarchar(max) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    [PhoneNumber] nvarchar(max) NULL,
    [PhoneNumberConfirmed] bit NOT NULL,
    [TwoFactorEnabled] bit NOT NULL,
    [LockoutEnd] datetimeoffset NULL,
    [LockoutEnabled] bit NOT NULL,
    [AccessFailedCount] int NOT NULL,
    CONSTRAINT [PK_AspNetUsers] PRIMARY KEY ([Id])
);

CREATE TABLE [Categories] (
    [Id] int NOT NULL IDENTITY,
    [CategoryName] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Categories] PRIMARY KEY ([Id])
);

CREATE TABLE [AspNetRoleClaims] (
    [Id] int NOT NULL IDENTITY,
    [RoleId] uniqueidentifier NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [AspNetUserClaims] (
    [Id] int NOT NULL IDENTITY,
    [UserId] uniqueidentifier NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [AspNetUserLogins] (
    [LoginProvider] nvarchar(450) NOT NULL,
    [ProviderKey] nvarchar(450) NOT NULL,
    [ProviderDisplayName] nvarchar(max) NULL,
    [UserId] uniqueidentifier NOT NULL,
    CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]),
    CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [AspNetUserRoles] (
    [UserId] uniqueidentifier NOT NULL,
    [RoleId] uniqueidentifier NOT NULL,
    CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY ([UserId], [RoleId]),
    CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [AspNetUserTokens] (
    [UserId] uniqueidentifier NOT NULL,
    [LoginProvider] nvarchar(450) NOT NULL,
    [Name] nvarchar(450) NOT NULL,
    [Value] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
    CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [Folders] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    CONSTRAINT [PK_Folders] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Folders_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [Audios] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    [Artist] nvarchar(max) NOT NULL,
    [Format] nvarchar(max) NOT NULL,
    [Duration] int NOT NULL,
    [UploadDate] datetime2 NOT NULL,
    [CategoryId] int NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    CONSTRAINT [PK_Audios] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Audios_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_Audios_Categories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [Ebooks] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    [Author] nvarchar(max) NOT NULL,
    [Format] nvarchar(max) NOT NULL,
    [PageCount] int NULL,
    [UploadDate] datetime2 NOT NULL,
    [CategoryId] int NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    CONSTRAINT [PK_Ebooks] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Ebooks_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_Ebooks_Categories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [Images] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    [Author] nvarchar(max) NOT NULL,
    [Format] nvarchar(max) NOT NULL,
    [UploadDate] datetime2 NOT NULL,
    [CategoryId] int NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    CONSTRAINT [PK_Images] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Images_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_Images_Categories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [Videos] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    [Author] nvarchar(max) NOT NULL,
    [Format] nvarchar(max) NOT NULL,
    [Duration] int NOT NULL,
    [UploadDate] datetime2 NOT NULL,
    [CategoryId] int NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    CONSTRAINT [PK_Videos] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Videos_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_Videos_Categories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [FolderItemAudios] (
    [FolderId] int NOT NULL,
    [AudioId] int NOT NULL,
    CONSTRAINT [PK_FolderItemAudios] PRIMARY KEY ([FolderId], [AudioId]),
    CONSTRAINT [FK_FolderItemAudios_Audios_AudioId] FOREIGN KEY ([AudioId]) REFERENCES [Audios] ([Id]),
    CONSTRAINT [FK_FolderItemAudios_Folders_FolderId] FOREIGN KEY ([FolderId]) REFERENCES [Folders] ([Id])
);

CREATE TABLE [FolderItemEbooks] (
    [FolderId] int NOT NULL,
    [EbookId] int NOT NULL,
    CONSTRAINT [PK_FolderItemEbooks] PRIMARY KEY ([FolderId], [EbookId]),
    CONSTRAINT [FK_FolderItemEbooks_Ebooks_EbookId] FOREIGN KEY ([EbookId]) REFERENCES [Ebooks] ([Id]),
    CONSTRAINT [FK_FolderItemEbooks_Folders_FolderId] FOREIGN KEY ([FolderId]) REFERENCES [Folders] ([Id])
);

CREATE TABLE [FolderItemImages] (
    [FolderId] int NOT NULL,
    [ImageId] int NOT NULL,
    CONSTRAINT [PK_FolderItemImages] PRIMARY KEY ([FolderId], [ImageId]),
    CONSTRAINT [FK_FolderItemImages_Folders_FolderId] FOREIGN KEY ([FolderId]) REFERENCES [Folders] ([Id]),
    CONSTRAINT [FK_FolderItemImages_Images_ImageId] FOREIGN KEY ([ImageId]) REFERENCES [Images] ([Id])
);

CREATE TABLE [FolderItemVideos] (
    [FolderId] int NOT NULL,
    [VideoId] int NOT NULL,
    CONSTRAINT [PK_FolderItemVideos] PRIMARY KEY ([FolderId], [VideoId]),
    CONSTRAINT [FK_FolderItemVideos_Folders_FolderId] FOREIGN KEY ([FolderId]) REFERENCES [Folders] ([Id]),
    CONSTRAINT [FK_FolderItemVideos_Videos_VideoId] FOREIGN KEY ([VideoId]) REFERENCES [Videos] ([Id])
);

CREATE INDEX [IX_AspNetRoleClaims_RoleId] ON [AspNetRoleClaims] ([RoleId]);

CREATE UNIQUE INDEX [RoleNameIndex] ON [AspNetRoles] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL;

CREATE INDEX [IX_AspNetUserClaims_UserId] ON [AspNetUserClaims] ([UserId]);

CREATE INDEX [IX_AspNetUserLogins_UserId] ON [AspNetUserLogins] ([UserId]);

CREATE INDEX [IX_AspNetUserRoles_RoleId] ON [AspNetUserRoles] ([RoleId]);

CREATE INDEX [EmailIndex] ON [AspNetUsers] ([NormalizedEmail]);

CREATE UNIQUE INDEX [UserNameIndex] ON [AspNetUsers] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL;

CREATE INDEX [IX_Audios_CategoryId] ON [Audios] ([CategoryId]);

CREATE INDEX [IX_Audios_UserId] ON [Audios] ([UserId]);

CREATE INDEX [IX_Ebooks_CategoryId] ON [Ebooks] ([CategoryId]);

CREATE INDEX [IX_Ebooks_UserId] ON [Ebooks] ([UserId]);

CREATE INDEX [IX_FolderItemAudios_AudioId] ON [FolderItemAudios] ([AudioId]);

CREATE INDEX [IX_FolderItemEbooks_EbookId] ON [FolderItemEbooks] ([EbookId]);

CREATE INDEX [IX_FolderItemImages_ImageId] ON [FolderItemImages] ([ImageId]);

CREATE INDEX [IX_FolderItemVideos_VideoId] ON [FolderItemVideos] ([VideoId]);

CREATE INDEX [IX_Folders_UserId] ON [Folders] ([UserId]);

CREATE INDEX [IX_Images_CategoryId] ON [Images] ([CategoryId]);

CREATE INDEX [IX_Images_UserId] ON [Images] ([UserId]);

CREATE INDEX [IX_Videos_CategoryId] ON [Videos] ([CategoryId]);

CREATE INDEX [IX_Videos_UserId] ON [Videos] ([UserId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250421124534_InitialCreate', N'9.0.0');

ALTER TABLE [AspNetUsers] ADD [FullName] nvarchar(max) NOT NULL DEFAULT N'';

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250421132849_InitialCreate2.1', N'9.0.0');

ALTER TABLE [Videos] ADD [ResourceUrl] nvarchar(2048) NULL;

ALTER TABLE [Images] ADD [ResourceUrl] nvarchar(2048) NULL;

ALTER TABLE [Ebooks] ADD [ResourceUrl] nvarchar(2048) NULL;

ALTER TABLE [Audios] ADD [ResourceUrl] nvarchar(2048) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20261115234928_AddMediaResourceUrl', N'9.0.0');

COMMIT;
GO