interface StatCardProps {
title: string;
value: string;
description: string;
}

function StatCard({ title, value, description }: StatCardProps) {
return (
<div className="stat-card">
    <p className="stat-card-title">{title}</p>

        <p className="stat-card-value">
            {value}
        </p>

        <p className="stat-card-description">
            {description}
        </p>
    </div>
);

}

export default StatCard;