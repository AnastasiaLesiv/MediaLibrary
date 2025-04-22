namespace Media_library.Startups;

public static class CorsStartup
{
    public static void ConfigureCors(this IServiceCollection services, IConfiguration configuration,
        string myAllowSpecificOrigins)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(name: myAllowSpecificOrigins,
                policy  =>
                {
                    policy.WithOrigins("http://localhost:4200")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                });
        });
    }
}