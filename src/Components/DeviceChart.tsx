import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import "../Chart.css";

import type { DeviceStatistics } from "../types/dashboard";

interface DeviceChartProps {
    data: DeviceStatistics[];
}

function DeviceChart({ data }: DeviceChartProps) {
    return (
        <div className="chart-card">
            <div className="chart-header">
                <h2>Device comparison</h2>
                <p>Sessions by device</p>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    layout="vertical"
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis type="number" />

                    <YAxis
                        type="category"
                        dataKey="deviceName"
                        width={120}
                    />

                    <Tooltip />

                    <Bar
                        dataKey="sessionCount"
                        name="Sessions"
                        fill="#00AC9E"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default DeviceChart;