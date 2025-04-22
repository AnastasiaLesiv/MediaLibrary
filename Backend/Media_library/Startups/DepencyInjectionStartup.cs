using Media_library.Configuration;
using Media_library.Repositories;
using Media_library.Repositories.MediaTypesRepositories;
using Media_library.Services;
using Media_library.Services.MediaTypesServices.Contracts;
using Media_library.Services.MediaTypesServices.Implementations;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Media_library.Startups;

public static class DependencyInjectionStartup
{
    public static void ConfigureDependencyInjection(this IServiceCollection services, IConfiguration configuration)
    {
      services.AddScoped<IUserService, UserService>();
      services.AddScoped<IUserRepository, UserRepository>();
      services.AddScoped<IFolderService, FolderService>();
      services.AddScoped<IFolderRepository, FolderRepository>();
      services.AddScoped<IAudioRepository, AudioRepository>();
      services.AddScoped<IAudioService, AudioService>();
      services.AddScoped<IEbookRepository, EbookRepository>();
      services.AddScoped<IEbookService, EbookService>();
      services.AddScoped<IVideoRepository, VideoRepository>();
      services.AddScoped<IVideoService, VideoService>();
      services.AddScoped<IImageRepository, ImageRepository>();
      services.AddScoped<IImageService, ImageService>();
      services.Configure<JwtOptions>( configuration.GetSection(JwtOptions.SectionName));
    }
}