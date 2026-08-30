namespace CSEProject.Models;

public class DatabaseSettings
{
    public string Server { get; set; } = "localhost";
    public string Port { get; set; } = "1433";
    public string Database { get; set; } = "CSESessionDemo";
    public string Username { get; set; } = "";
    public string Password { get; set; } = "";
    public bool UseWindowsAuthentication { get; set; } = true;
    public bool TrustServerCertificate { get; set; } = true;
}