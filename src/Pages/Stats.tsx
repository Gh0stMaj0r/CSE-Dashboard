import { useEffect, useState } from "react";
import { getDashboardUsage, getDashboardDevices, getDashboardFeatures } from "../API/DashboardAPI";
import type { DashboardUsage, DeviceStatistics, FeatureStatistics } from "../types/dashboard";
import DateFilter from "../Components/DateFilter";
import "../App.css"
import UsageChart from "../Components/UsageChart";
import DeviceChart from "../Components/DeviceChart";
import FeatureChart from "../Components/FeatureChart";

const Stats = () => {
    const [usage, setUsage] = useState<DashboardUsage[]>([]);
    const [devices, setDevices] = useState<DeviceStatistics[]>([]);
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
                usageData,
                devicesData,
                featuresData
            ] = await Promise.all([
                getDashboardUsage(startDate, endDate),
                getDashboardDevices(startDate, endDate),
                getDashboardFeatures(startDate, endDate)
            ]);

            setUsage(usageData);
            setDevices(devicesData);
            setFeatures(featuresData);

        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => { loadDashboard(); }, []);

    return (
        <main className="dashboard"> 
            <header className="dashboard-header"> 
                <h1 className="subtitle"> More Stats </h1> 
            </header> 
            <DateFilter startDate={startDate} endDate={endDate} onStartDateChange={setStartDate} onEndDateChange={setEndDate} onApply={loadDashboard} />
            <section className="dashboard-section">
                <h2>
                    Usage over time
                </h2>

                <UsageChart data={usage} />
            </section>

            <section className="dashboard-section">
                <h2>
                    Device comparison
                </h2>

                <DeviceChart data={devices} />
            </section>

            <section className="dashboard-section">
                <h2>
                    Feature comparison
                </h2>

                <FeatureChart data={features} />
            </section>
        </main>
    );
}

export default Stats;