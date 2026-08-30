using CSEProject.Data;
using CSEProject.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSEProject.Controllers;

[ApiController]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    private readonly CSESessionDbContext context;

    public DashboardController(CSESessionDbContext db)
    {
        context = db;
    }

    [HttpGet("summary")]
    public async Task<DashboardSummaryDto> GetSummary(
        [FromQuery] DashboardFilterDto filter)
    {
        var Sessions = context.Sessions
            .AsNoTracking()
            .AsQueryable();

        if (filter.StartDate.HasValue)
        {
            Sessions = Sessions.Where(session => session.FinishedAt >= filter.StartDate.Value);
        }

        if (filter.EndDate.HasValue)
        {
            var toDate = filter.EndDate.Value.Date.AddDays(1);

            Sessions = Sessions.Where(session => session.FinishedAt < toDate);
        }

        var Summary = new DashboardSummaryDto
        {
            SessionCount = await Sessions.CountAsync(),

            TotalPlayTimeMinutes = await Sessions
                .SumAsync(session => (long)session.DurationSeconds) / 60,

            PlayerCount = await Sessions
                .SumAsync(session => session.PlayerCount),

            ActiveDeviceCount = await Sessions
                .Select(session => session.DeviceId)
                .Distinct()
                .CountAsync()
        };

        return Summary;
    }

    [HttpGet("usage")]
    public async Task<List<DashboardUsageDto>> GetUsage(
        [FromQuery] DashboardFilterDto filter)
    {
        var Sessions = context.Sessions
            .AsNoTracking()
            .AsQueryable();

        if (filter.StartDate.HasValue)
        {
            Sessions = Sessions.Where(session => session.FinishedAt >= filter.StartDate.Value);
        }

        if (filter.EndDate.HasValue)
        {
            var toDate = filter.EndDate.Value.Date.AddDays(1);

            Sessions = Sessions.Where(session => session.FinishedAt < toDate);
        }

        var Usage = await Sessions
            .GroupBy(session => session.FinishedAt.Date)
            .Select(group => new DashboardUsageDto
            {
                Date = group.Key,

                SessionCount = group.Count(),

                PlayTimeMinutes = group.Sum(session => (long)session.DurationSeconds) / 60,

                PlayerCount = group.Sum(session => session.PlayerCount)
            })
            .OrderBy(day => day.Date)
            .ToListAsync();

        return Usage;
    }

    [HttpGet("devices")]
    public async Task<List<DeviceStatisticsDto>> GetDevices(
        [FromQuery] DashboardFilterDto filter)
    {
        var Sessions = context.Sessions
            .AsNoTracking()
            .AsQueryable();

        if (filter.StartDate.HasValue)
        {
            Sessions = Sessions.Where(session => session.FinishedAt >= filter.StartDate.Value);
        }

        if (filter.EndDate.HasValue)
        {
            var toDate = filter.EndDate.Value.Date.AddDays(1);

            Sessions = Sessions.Where(session => session.FinishedAt < toDate);
        }

        var Devices = await context.Devices
            .AsNoTracking()
            .Select(device => new DeviceStatisticsDto
            {
                DeviceId = device.DeviceId,

                DeviceName = device.DeviceName,

                DeviceType = device.DeviceType,

                SiteName = device.SiteName,

                Region = device.Region,

                SessionCount = Sessions.Count(session =>
                    session.DeviceId == device.DeviceId),

                PlayTimeMinutes = Sessions
                    .Where(session => session.DeviceId == device.DeviceId)
                    .Sum(session => (long)session.DurationSeconds) / 60,

                PlayerCount = Sessions
                    .Where(session => session.DeviceId == device.DeviceId)
                    .Sum(session => session.PlayerCount)
            })
            .OrderByDescending(device => device.SessionCount)
            .ToListAsync();

        return Devices;
    }

    [HttpGet("features")]
    public async Task<List<FeatureStatisticsDto>> GetFeatures([FromQuery] DashboardFilterDto filter)
    {
        var Sessions = context.Sessions
            .AsNoTracking()
            .AsQueryable();

        if (filter.StartDate.HasValue)
        {
            Sessions = Sessions.Where(session => session.FinishedAt >= filter.StartDate.Value);
        }

        if (filter.EndDate.HasValue)
        {
            var toDate = filter.EndDate.Value.Date.AddDays(1);

            Sessions = Sessions.Where(session => session.FinishedAt < toDate);
        }

        var Features = await context.Features
            .AsNoTracking()
            .Select(Feature => new FeatureStatisticsDto
            {
                FeatureId = Feature.FeatureId,

                FeatureName = Feature.FeatureName,

                Genre = Feature.Genre,

                SupportsMultiplayer = Feature.SupportsMultiplayer,

                SessionCount = Sessions.Count(session => session.FeatureId == Feature.FeatureId),

                PlayTimeMinutes = Sessions
                    .Where(session => session.FeatureId == Feature.FeatureId)
                    .Sum(session => (long)session.DurationSeconds) / 60,

                PlayerCount = Sessions.Where(session => session.FeatureId == Feature.FeatureId)
                    .Sum(session => session.PlayerCount)
            })
            .OrderByDescending(feature => feature.SessionCount)
            .ToListAsync();

        return Features;
    }
}