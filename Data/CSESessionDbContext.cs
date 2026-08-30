using CSEProject.Models;
using Microsoft.EntityFrameworkCore;

namespace CSEProject.Data;

public class CSESessionDbContext : DbContext
{
    public CSESessionDbContext(
        DbContextOptions<CSESessionDbContext> options)
        : base(options)
    {
    }

    public DbSet<Device> Devices => Set<Device>();

    public DbSet<Feature> Features => Set<Feature>();

    public DbSet<Session> Sessions => Set<Session>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Device>(entity =>
        {
            entity.ToTable("Devices");

            entity.HasKey(d => d.DeviceId);
        });

        modelBuilder.Entity<Feature>(entity =>
        {
            entity.ToTable("Features");

            entity.HasKey(f => f.FeatureId);
        });

        modelBuilder.Entity<Session>(entity =>
        {
            entity.ToTable("Sessions");

            entity.HasKey(s => s.SessionId);

            entity.HasOne(s => s.Device)
                .WithMany(d => d.Sessions)
                .HasForeignKey(s => s.DeviceId);

            entity.HasOne(s => s.Feature)
                .WithMany(f => f.Sessions)
                .HasForeignKey(s => s.FeatureId);
        });
    }
}