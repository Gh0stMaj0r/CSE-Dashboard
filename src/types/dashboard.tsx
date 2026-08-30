export interface DashboardSummary {
    sessionCount: number;
    totalPlayTimeMinutes: number;
    playerCount: number;
    activeDeviceCount: number;
}

export interface DashboardUsage {
date: string;
sessionCount: number;
playTimeMinutes: number;
playerCount: number;
}

export interface DeviceStatistics {
deviceId: number;
deviceName: string;
deviceType: string;
siteName: string;
region: string;
sessionCount: number;
playTimeMinutes: number;
playerCount: number;
}

export interface FeatureStatistics {
featureId: number;
featureName: string;
genre: string;
supportsMultiplayer: boolean;
sessionCount: number;
playTimeMinutes: number;
playerCount: number;
}