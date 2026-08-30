namespace CSEProject.Models;

public class Device
{
    public int DeviceId { get; set; }

    public string DeviceName { get; set; } = string.Empty;

    public string DeviceType { get; set; } = string.Empty;

    public string SiteName { get; set; } = string.Empty;

    public string Region { get; set; } = string.Empty;

    public DateTime InstalledOn { get; set; }

    public ICollection<Session> Sessions { get; set; } = new List<Session>();
}