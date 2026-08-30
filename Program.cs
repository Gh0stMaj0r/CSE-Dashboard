using CSEProject.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<DatabaseSettingsService>();

builder.Services.AddDbContext<CSESessionDbContext>(
    (serviceProvider, options) =>
    {
        var settingsService =
            serviceProvider.GetRequiredService<
                DatabaseSettingsService>();

        options.UseSqlServer(
            settingsService.GetConnectionString()
        );
    });

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("React", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}


app.UseCors("React");
app.MapControllers();

app.Run();
