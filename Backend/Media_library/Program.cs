using System.Text;
using System.Text.Json.Serialization;
using Media_library;
using Media_library.Configuration;
using Media_library.Entities;
using Media_library.Repositories;
using Media_library.Repositories.MediaTypesRepositories;
using Media_library.Services;
using Media_library.Services.MediaTypesServices.Contracts;
using Media_library.Services.MediaTypesServices.Implementations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddIdentity<User, IdentityRole<Guid>>(options =>
    {
        options.Password.RequireDigit = true;
        options.Password.RequiredLength = 6;
        options.Password.RequireNonAlphanumeric = true;
        options.SignIn.RequireConfirmedAccount = false;
    })
    .AddEntityFrameworkStores<Context>()
    .AddDefaultTokenProviders();
builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = true;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateLifetime = true,
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["JwtOptions:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["JwtOptions:Audience"],
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtOptions:Key"])),
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IFolderService, FolderService>();
builder.Services.AddScoped<IFolderRepository, FolderRepository>();
builder.Services.AddScoped<IAudioRepository, AudioRepository>();
builder.Services.AddScoped<IAudioService, AudioService>();
builder.Services.AddScoped<IEbookRepository, EbookRepository>();
builder.Services.AddScoped<IEbookService, EbookService>();
builder.Services.AddScoped<IVideoRepository, VideoRepository>();
builder.Services.AddScoped<IVideoService, VideoService>();
builder.Services.AddScoped<IImageRepository, ImageRepository>();
builder.Services.AddScoped<IImageService, ImageService>();
var re = builder.Configuration.GetSection(JwtOptions.SectionName);
builder.Services.Configure<JwtBearerOptions>(re);
var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy  =>
        {
            policy.WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
});
builder.Logging.AddConsole();
builder.Services.AddAutoMapper(typeof(AutoMapperConfigurationProfile));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    //var filePath = Path.Combine(AppContext.BaseDirectory, name + ".Api.xml");
    //options.IncludeXmlComments(filePath);

    options.CustomSchemaIds(type => type.ToString());

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT containing userid claim",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
    });
    var security = new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                },
                UnresolvedReference = true
            },
            new List<string>()
        }
    };
    options.AddSecurityRequirement(security);
});
builder.Services.AddDbContext<Context>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication(); 
app.UseAuthorization();
app.MapControllers();
app.UseCors(MyAllowSpecificOrigins);

app.Run();
