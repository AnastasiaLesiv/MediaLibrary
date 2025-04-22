using Microsoft.OpenApi.Models;

namespace Media_library.Startups.Swagger;

public static class SwaggerStartup
{
    public static void ConfigureProjectSwagger(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "JWT containing userid claim",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
            });
            options.OperationFilter<AuthorizeCheckOperationFilter>();
        });
    }
}