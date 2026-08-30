namespace CSEProject.Models;

public class Feature
{
    public int FeatureId { get; set; }

    public string FeatureName { get; set; } = string.Empty;

    public string Genre { get; set; } = string.Empty;

    public bool SupportsMultiplayer { get; set; }

    public ICollection<Session> Sessions { get; set; } = new List<Session>();
}