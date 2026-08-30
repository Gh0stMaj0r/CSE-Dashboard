namespace CSEProject.DTOs;

public class DashboardSummaryDto
{
    public int SessionCount { get; set; }

    public long TotalPlayTimeMinutes { get; set; }

    public int PlayerCount { get; set; }

    public int ActiveDeviceCount { get; set; }
}

public class DashboardUsageDto
{
    public DateTime Date { get; set; }

    public int SessionCount { get; set; }

    public long PlayTimeMinutes { get; set; }

    public int PlayerCount { get; set; }
}

public class DeviceStatisticsDto
{
    public int DeviceId { get; set; }

    public string DeviceName { get; set; } = string.Empty;

    public string DeviceType { get; set; } = string.Empty;

    public string SiteName { get; set; } = string.Empty;

    public string Region { get; set; } = string.Empty;

    public int SessionCount { get; set; }

    public long PlayTimeMinutes { get; set; }

    public int PlayerCount { get; set; }
}

public class FeatureStatisticsDto
{
    public int FeatureId { get; set; }

    public string FeatureName { get; set; } = string.Empty;

    public string Genre { get; set; } = string.Empty;

    public bool SupportsMultiplayer { get; set; }

    public int SessionCount { get; set; }

    public long PlayTimeMinutes { get; set; }

    public int PlayerCount { get; set; }
}

public class DashboardFilterDto
{
    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }
}