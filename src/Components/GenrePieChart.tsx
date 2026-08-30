import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";
import "../Chart.css";

import type { FeatureStatistics } from "../types/dashboard";

interface GenrePieChartProps {
    data: FeatureStatistics[];
}

function GenrePieChart({ data }: GenrePieChartProps) {

    const colors = [
        "#00AC9E",
        "#6366F1",
        "#F59E0B",
        "#EF4444",
        "#8B5CF6",
        "#14B8A6",
    ];

    const genreData = Object.values(
        data.reduce(
            (result, feature) => {
                if (!result[feature.genre]) {
                    result[feature.genre] = {
                        name: feature.genre,
                        value: 0,
                    };
                }

                result[feature.genre].value += feature.sessionCount;

                return result;
            },
            {} as Record<
                string,
                { name: string; value: number }
            >
        )
    );

    const mostPopularGame = [...data].sort(
        (a, b) => b.sessionCount - a.sessionCount
    )[0];

    return (
        <div className="chart-card">
            <div className="chart-header">
                <h2>Genre popularity</h2>

                <p>
                    Session distribution by genre
                </p>
            </div>

            <div className="genre-chart">

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >
                    <PieChart>

                        <Pie
                            data={genreData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            innerRadius={70}
                        >
                            {genreData.map((genre, index) => (
                                <Cell
                                    key={genre.name}
                                    fill={colors[index % colors.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>
                </ResponsiveContainer>

                {mostPopularGame && (
                    <div className="popular-game">
                        <span>
                            Most popular game <strong>{mostPopularGame.featureName}</strong>
                        </span>

                        <p>
                            {mostPopularGame.sessionCount.toLocaleString(
                                "fi-FI"
                            )} sessions
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default GenrePieChart;