using CSEProject.Data;
using CSEProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace CSEProject.Controllers;

[ApiController]
[Route("api/settings")]
public class SettingsController : ControllerBase
{
    private readonly DatabaseSettingsService settingsService;

    public SettingsController(
        DatabaseSettingsService settingsService)
    {
        this.settingsService = settingsService;
    }

    [HttpGet]
    public IActionResult GetSettings()
    {
        var settings = settingsService.GetSettings();
        return Ok(new
        {
            server = settings.Server,
            port = settings.Port,
            database = settings.Database,
            username = settings.Username,
            useWindowsAuthentication =
                settings.UseWindowsAuthentication,
            trustServerCertificate =
                settings.TrustServerCertificate
        });
    }

    [HttpPost("test")]
    public async Task<IActionResult> TestConnection(
        [FromBody] DatabaseSettings settings)
    {
        try
        {
            var connectionString =
                BuildConnectionString(settings);

            await using var connection =
                new SqlConnection(connectionString);

            await connection.OpenAsync();

            return Ok(new
            {
                success = true,
                message = "Database connection successful."
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                success = false,
                message = ex.Message
            });
        }
    }

    [HttpPost("save")]
    public IActionResult SaveSettings(
        [FromBody] DatabaseSettings settings)
    {
        try
        {
            settingsService.SaveSettings(settings);

            return Ok(new
            {
                success = true,
                message = "Database settings saved."
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                success = false,
                message = ex.Message
            });
        }
    }

    private static string BuildConnectionString(
        DatabaseSettings settings)
    {
        var builder = new SqlConnectionStringBuilder
        {
            DataSource = string.IsNullOrWhiteSpace(
                settings.Port)
                ? settings.Server
                : $"{settings.Server},{settings.Port}",

            InitialCatalog = settings.Database,

            TrustServerCertificate =
                settings.TrustServerCertificate
        };

        if (settings.UseWindowsAuthentication)
        {
            builder.IntegratedSecurity = true;
        }
        else
        {
            builder.IntegratedSecurity = false;
            builder.UserID = settings.Username;
            builder.Password = settings.Password;
        }

        return builder.ConnectionString;
    }
}