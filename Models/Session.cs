namespace CSEProject.Models;

public class Session
{
    public long SessionId { get; set; }

    public int DeviceId { get; set; }

    public int FeatureId { get; set; }

    public string LevelName { get; set; } = string.Empty;

    public int DurationSeconds { get; set; }

    public int PlayerCount { get; set; }

    public DateTime FinishedAt { get; set; }

    public Device Device { get; set; } = null!;

    public Feature Feature { get; set; } = null!;
}