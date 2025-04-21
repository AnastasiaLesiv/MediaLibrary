using System.Drawing.Design;
using AutoMapper;
using Media_library.Controllers;
using Media_library.Dtos.ResponseDtos;
using Media_library.Entities;
using Media_library.Entities.FolderItems;
using Media_library.Entities.MediaTypes;

namespace Media_library.Configuration;

public class AutoMapperConfigurationProfile: Profile
{
    public AutoMapperConfigurationProfile()
    {
        CreateMap<User, UserDto>();
        CreateMap<Folder, FolderDto>()
            .ForMember(dest => dest.Audios, opt => opt.MapFrom(src => src.FolderItemAudios.Select(x => x.Audio)))
            .ForMember(dest => dest.Ebooks, opt => opt.MapFrom(src => src.FolderItemEbooks.Select(x => x.Ebook)))
            .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.FolderItemImages.Select(x => x.Image)))
            .ForMember(dest => dest.Videos, opt => opt.MapFrom(src => src.FolderItemVideos.Select(x => x.Video)));
        CreateMap<Audio, AudioDto>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.CategoryName));
        CreateMap<Ebook, EbookDto>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.CategoryName));
        CreateMap<Image, ImageDto>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.CategoryName));
        CreateMap<Video, VideoDto>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.CategoryName));
        CreateMap<Category, CategoryDto>();
    }
}