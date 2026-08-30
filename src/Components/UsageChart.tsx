import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import "../Chart.css";

import type { DashboardUsage } from "../types/dashboard";

interface UsageChartProps {
    data: DashboardUsage[];
}

function UsageChart({ data }: UsageChartProps) {
    return (
        <div className="chart-card">
            <div className="chart-header">
                <h2>Usage over time</h2>
                <p>Daily usage during selected period</p>
            </div>

            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="date"
                        tickFormatter={(value) =>
                            new Date(value).toLocaleDateString("fi-FI", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })
                        }
                    />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="sessionCount"
                        name="Sessions"
                        stroke="#00AC9E"
                        strokeWidth={2}
                    />

                    <Line
                        type="monotone"
                        dataKey="playTimeMinutes"
                        name="Play time"
                        stroke="#00AC9E"
                        strokeWidth={2}
                    />

                    <Line
                        type="monotone"
                        dataKey="playerCount"
                        name="Players"
                        stroke="#00AC9E"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default UsageChart;