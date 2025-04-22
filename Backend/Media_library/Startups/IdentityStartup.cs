using Media_library.Entities;
using Microsoft.AspNetCore.Identity;

namespace Media_library.Startups;

public static class IdentityStartup
{
    public static void ConfigureIdentity(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddIdentity<User, IdentityRole<Guid>>(options =>
        {
            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 6;
            options.Password.RequireNonAlphanumeric = true;
            options.SignIn.RequireConfirmedAccount = false;
        })
        .AddEntityFrameworkStores<Context>()
        .AddDefaultTokenProviders();
   
    }
}