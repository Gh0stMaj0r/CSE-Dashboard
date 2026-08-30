const API_URL = "http://localhost:5133/api";

export async function getDashboardSummary(startDate: string, endDate: string) {
    const response = await fetch(`${API_URL}/dashboard/summary?startDate=${startDate}&endDate=${endDate}`);

    if (!response.ok) {
        throw new Error("Dashboard summary -haku epäonnistui.");
    }

    return response.json();
}

export async function getDashboardUsage(startDate: string, endDate: string) {
    const response = await fetch(`${API_URL}/dashboard/usage?startDate=${startDate}&endDate=${endDate}`);

    if (!response.ok) {
        throw new Error("Dashboard usage -haku epäonnistui.");
    }

    return response.json();
}

export async function getDashboardDevices(startDate: string, endDate: string) {
    const response = await fetch(`${API_URL}/dashboard/devices?startDate=${startDate}&endDate=${endDate}`);

    if (!response.ok) {
        throw new Error("Dashboard devices -haku epäonnistui.");
    }

    return response.json();
}

export async function getDashboardFeatures(startDate: string, endDate: string) {
    const response = await fetch(`${API_URL}/dashboard/features?startDate=${startDate}&endDate=${endDate}`);

    if (!response.ok) {
        throw new Error("Dashboard features -haku epäonnistui.");
    }

    return response.json();
}