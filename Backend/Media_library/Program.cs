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
using Media_library.Startups;
using Media_library.Startups.Swagger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.ConfigureIdentity(builder.Configuration);
builder.Services.ConfigureAuthentication(builder.Configuration);
builder.Services.ConfigureDependencyInjection(builder.Configuration);

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.ConfigureCors(builder.Configuration, MyAllowSpecificOrigins);
builder.Logging.AddConsole();
builder.Services.AddAutoMapper(typeof(AutoMapperConfigurationProfile));
builder.Services.ConfigureProjectSwagger(builder.Configuration);
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