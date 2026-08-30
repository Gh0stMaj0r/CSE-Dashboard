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

import type { FeatureStatistics } from "../types/dashboard";

interface FeatureChartProps {
    data: FeatureStatistics[];
}

function FeatureChart({ data }: FeatureChartProps) {
    return (
        <div className="chart-card">
            <div className="chart-header">
                <h2>Feature comparison</h2>
                <p>Sessions by feature</p>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="featureName"
                        angle={-35}
                        textAnchor="end"
                        height={100}
                    />

                    <YAxis />

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

export default FeatureChart;