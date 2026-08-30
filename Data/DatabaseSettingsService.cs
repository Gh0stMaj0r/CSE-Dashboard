using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using CSEProject.Models;
using Microsoft.Data.SqlClient;

namespace CSEProject.Data;

public class DatabaseSettingsService
{
    private readonly string settingsPath;
    private readonly DatabaseSettings defaultSettings;
    public DatabaseSettingsService(IConfiguration configuration)
    {
        var folder = Path.Combine(
            Environment.GetFolderPath(
                Environment.SpecialFolder.LocalApplicationData),
            "CSEProject"
        );

        Directory.CreateDirectory(folder);

        settingsPath = Path.Combine(
            folder,
            "database-settings.json"
        );

        defaultSettings = CreateDefaultSettings(
            configuration.GetConnectionString("DefaultConnection")
        );
    }

    public DatabaseSettings GetSettings()
    {
        if (!File.Exists(settingsPath))
        {
            return defaultSettings;
        }

        try
        {
            var json = File.ReadAllText(settingsPath);

            var stored =
                JsonSerializer.Deserialize<StoredSettings>(json);

            if (stored == null)
            {
                return defaultSettings;
            }

            return new DatabaseSettings
            {
                Server = stored.Server,
                Port = stored.Port,
                Database = stored.Database,
                Username = stored.Username,
                Password = Decrypt(stored.EncryptedPassword),
                UseWindowsAuthentication =
                    stored.UseWindowsAuthentication,
                TrustServerCertificate =
                    stored.TrustServerCertificate
            };
        }
        catch
        {
            return defaultSettings;
        }
    }

    public void SaveSettings(DatabaseSettings settings)
    {
        var stored = new StoredSettings
        {
            Server = settings.Server,
            Port = settings.Port,
            Database = settings.Database,
            Username = settings.Username,
            EncryptedPassword =
                Encrypt(settings.Password),
            UseWindowsAuthentication =
                settings.UseWindowsAuthentication,
            TrustServerCertificate =
                settings.TrustServerCertificate
        };
        var json = JsonSerializer.Serialize(
            stored,
            new JsonSerializerOptions
            {
                WriteIndented = true
            }
        );

        File.WriteAllText(settingsPath, json);
    }

    public string GetConnectionString()
    {
        var settings = GetSettings();

        var builder = new SqlConnectionStringBuilder
        {
            DataSource = string.IsNullOrWhiteSpace(settings.Port)
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

    private static DatabaseSettings CreateDefaultSettings(
        string? connectionString)
    {
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            return new DatabaseSettings();
        }

        try
        {
            var builder =
                new SqlConnectionStringBuilder(
                    connectionString
                );

            var server = builder.DataSource;
            var port = "1433";

            if (server.Contains(','))
            {
                var parts = server.Split(',', 2);

                server = parts[0];
                port = parts[1];
            }

            return new DatabaseSettings
            {
                Server = server,
                Port = port,
                Database = builder.InitialCatalog,
                Username = builder.UserID ?? "",
                Password = builder.Password ?? "",
                UseWindowsAuthentication =
                    builder.IntegratedSecurity,
                TrustServerCertificate =
                    builder.TrustServerCertificate
            };
        }
        catch
        {
            return new DatabaseSettings();
        }
    }

    private static string Encrypt(string value)
    {
        if (string.IsNullOrEmpty(value))
        {
            return "";
        }

        var bytes = Encoding.UTF8.GetBytes(value);

        var encrypted = ProtectedData.Protect(
            bytes,
            null,
            DataProtectionScope.CurrentUser
        );

        return Convert.ToBase64String(encrypted);
    }

    private static string Decrypt(string value)
    {
        if (string.IsNullOrEmpty(value))
        {
            return "";
        }

        try
        {
            var encrypted =
                Convert.FromBase64String(value);

            var decrypted = ProtectedData.Unprotect(
                encrypted,
                null,
                DataProtectionScope.CurrentUser
            );

            return Encoding.UTF8.GetString(decrypted);
        }
        catch
        {
            return "";
        }
    }

    private class StoredSettings
    {
        public string Server { get; set; } = "";
        public string Port { get; set; } = "";
        public string Database { get; set; } = "";
        public string Username { get; set; } = "";
        public string EncryptedPassword { get; set; } = "";
        public bool UseWindowsAuthentication { get; set; }
        public bool TrustServerCertificate { get; set; }
    }
}