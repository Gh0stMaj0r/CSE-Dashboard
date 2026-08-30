interface StatsFilterProps {
deviceId: string;
deviceType: string;
region: string;
genre: string;

devices: {
    deviceId: number;
    deviceName: string;
}[];

deviceTypes: string[];
regions: string[];
genres: string[];

onDeviceChange: (value: string) => void;
onDeviceTypeChange: (value: string) => void;
onRegionChange: (value: string) => void;
onGenreChange: (value: string) => void;

}

function StatsFilter({
deviceId,
deviceType,
region,
genre,
devices,
deviceTypes,
regions,
genres,
onDeviceChange,
onDeviceTypeChange,
onRegionChange,
onGenreChange,
}: StatsFilterProps) {
return (
<section className="stats-filter">

        <div className="stats-filter-field">
            <label htmlFor="device">
                Device
            </label>

            <select
                id="device"
                value={deviceId}
                onChange={(event) =>
                    onDeviceChange(event.target.value)
                }
            >
                <option value="">
                    All devices
                </option>

                {devices.map((device) => (
                    <option
                        key={device.deviceId}
                        value={device.deviceId}
                    >
                        {device.deviceName}
                    </option>
                ))}
            </select>
        </div>

        <div className="stats-filter-field">
            <label htmlFor="device-type">
                Device type
            </label>

            <select
                id="device-type"
                value={deviceType}
                onChange={(event) =>
                    onDeviceTypeChange(event.target.value)
                }
            >
                <option value="">
                    All device types
                </option>

                {deviceTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>

        <div className="stats-filter-field">
            <label htmlFor="region">
                Region
            </label>

            <select
                id="region"
                value={region}
                onChange={(event) =>
                    onRegionChange(event.target.value)
                }
            >
                <option value="">
                    All regions
                </option>

                {regions.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>

        <div className="stats-filter-field">
            <label htmlFor="genre">
                Genre
            </label>

            <select
                id="genre"
                value={genre}
                onChange={(event) =>
                    onGenreChange(event.target.value)
                }
            >
                <option value="">
                    All genres
                </option>

                {genres.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>

    </section>
);

}

export default StatsFilter;