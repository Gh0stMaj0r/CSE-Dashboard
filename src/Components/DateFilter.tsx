interface DateFilterProps {
    startDate: string;
    endDate: string;
    onStartDateChange: (date: string) => void;
    onEndDateChange: (date: string) => void;
    onApply: () => void;
}

function DateFilter({startDate, endDate, onStartDateChange, onEndDateChange, onApply,}: DateFilterProps) {
    return (
        <section className="date-filter">
            <div className="date-filter-field">
                <label htmlFor="start-date">StartDate</label>
                <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(event) => onStartDateChange(event.target.value)}
                />
            </div>

            <div className="date-filter-separator">
                →
            </div>

            <div className="date-filter-field">
                <label htmlFor="end-date">EndDate</label>
                <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(event) => onEndDateChange(event.target.value)}
                />
            </div>

            <button
                type="button"
                className="filter-button"
                onClick={onApply}
            >
                Apply filters
            </button>
        </section>
    );
}
export default DateFilter;