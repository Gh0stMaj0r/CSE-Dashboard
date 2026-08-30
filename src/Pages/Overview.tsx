import { useEffect, useState } from "react";
import { getDashboardSummary, getDashboardFeatures } from "../API/DashboardAPI";
import type { DashboardSummary, FeatureStatistics } from "../types/dashboard";
import StatCard from "../Components/StatCard";
import DateFilter from "../Components/DateFilter";
import GenrePieChart from "../Components/GenrePieChart";
import "../App.css"

const Overview = () => {
    const [summary, setSummary] = useState<DashboardSummary>();
    const [features, setFeatures] = useState<FeatureStatistics[]>([]);

    const today = new Date();

    const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );

    const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
    );

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const [startDate, setStartDate] = useState(
        formatDate(firstDayOfMonth)
    );

    const [endDate, setEndDate] = useState(
        formatDate(lastDayOfMonth)
    );
    
    const loadDashboard = async () => {
        try {
            const [
                summaryData,
                featuresData
            ] = await Promise.all([
                getDashboardSummary(startDate, endDate),
                getDashboardFeatures(startDate, endDate)
            ]);

            setSummary(summaryData);
            setFeatures(featuresData);

        } catch (error) {
            console.error(error);
        }
    }; 
    
    useEffect(() => { loadDashboard(); }, []);

    return (
        <main className="dashboard"> 
            <header className="dashboard-header"> 
                <h1 className="subtitle"> Statistics Overview </h1> 
            </header> 
            <DateFilter startDate={startDate} endDate={endDate} onStartDateChange={setStartDate} onEndDateChange={setEndDate} onApply={loadDashboard} />
            {summary && ( 
                <section className="stats-grid"> 
                    <StatCard title="Sessions" value={summary.sessionCount.toLocaleString("fi-FI")} description="Gaming Sessions Total" /> 
                    <StatCard title="Play time" value={`${summary.totalPlayTimeMinutes.toLocaleString("fi-FI")} min`} description="Playtime Total" /> 
                    <StatCard title="Players" value={summary.playerCount.toLocaleString("fi-FI")} description="Players Total" /> 
                    <StatCard title="Active devices" value={summary.activeDeviceCount.toLocaleString("fi-FI")} description="Active Devices" /> 
                </section> 
            )}
            <section className="dashboard-section">
                <h2>
                    Usage over time
                </h2>

                <GenrePieChart data={features} />
            </section>
        </main>
    );
}

export default Overview;