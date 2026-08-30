import { useState, useEffect } from "react";
import "../App.css"

type DatabaseSettings = {
    server: string
    port: string
    database: string
    username: string
    password: string
    useWindowsAuthentication: boolean
    trustServerCertificate: boolean
}

const defaultSettings: DatabaseSettings = {
    server: 'localhost',
    port: '1433',
    database: 'CSESessionDemo',
    username: '',
    password: '',
    useWindowsAuthentication: true,
    trustServerCertificate: true,
}

const API_URL = 'http://localhost:5133'

const DBSettings = () => {
    const [settings, setSettings] =
        useState<DatabaseSettings>(defaultSettings)

    const [loading, setLoading] = useState(true)
    const [testing, setTesting] = useState(false)
    const [saving, setSaving] = useState(false)

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        loadSettings()
    }, [])

    async function loadSettings() {
        try {
            const response = await fetch(
                `${API_URL}/api/settings`
            )

            if (!response.ok) {
                throw new Error(
                    'Could not load database settings.'
                )
            }

            const data = await response.json()

            setSettings({
                server: data.server ?? 'localhost',
                port: data.port ?? '1433',
                database:
                    data.database ?? 'CSESessionDemo',
                username: data.username ?? '',
                password: '',
                useWindowsAuthentication:
                    data.useWindowsAuthentication ?? true,
                trustServerCertificate:
                    data.trustServerCertificate ?? true,
            })
        } catch (err) {
            setError(
                'Could not connect to the backend.'
            )
        } finally {
            setLoading(false)
        }
    }

    function update(
        field: keyof DatabaseSettings,
        value: string | boolean
    ) {
        setSettings((current) => ({
            ...current,
            [field]: value,
        }))

        setMessage('')
        setError('')
    }

    async function testConnection() {
        setTesting(true)
        setMessage('')
        setError('')

        try {
            const response = await fetch(
                `${API_URL}/api/settings/test`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(settings),
                }
            )

            const data = await response.json()

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                    'Database connection failed.'
                )
            }

            setMessage(
                'Database connection successful.'
            )
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Database connection failed.'
            )
        } finally {
            setTesting(false)
        }
    }

    async function saveSettings() {
        setSaving(true)
        setMessage('')
        setError('')

        try {
            const response = await fetch(
                `${API_URL}/api/settings/save`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(settings),
                }
            )

            const data = await response.json()

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                    'Could not save settings.'
                )
            }

            setMessage(
                'Database settings saved successfully.'
            )
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Could not save settings.'
            )
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="settings-page">
                <h1>Database Settings</h1>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <section className="database-settings">

            <header className="dashboard-header">
                <h1 className="subtitle">Database Settings</h1>
            </header>

            <form className="database-settings-form">

                <div className="database-settings-field">
                    <label htmlFor="server">Server</label>
                    <input
                        id="server"
                        value={settings.server}
                        onChange={(e) =>
                            update(
                                'server',
                                e.target.value
                            )
                        }
                        placeholder="localhost"
                    />
                </div>

                <div className="database-settings-field">
                    <label htmlFor="port">Port</label>
                    <input
                        id="port"
                        value={settings.port}
                        onChange={(e) =>
                            update(
                                'port',
                                e.target.value
                            )
                        }
                        placeholder="1433"
                    />
                </div>

                <div className="database-settings-field">
                    <label htmlFor="database">Database</label>
                    <input
                        id="database"
                        value={settings.database}
                        onChange={(e) =>
                            update(
                                'database',
                                e.target.value
                            )
                        }
                        placeholder="CSESessionDemo"
                    />
                </div>

                <div className="database-settings-field">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        value={settings.username}
                        onChange={(e) =>
                            update(
                                'username',
                                e.target.value
                            )
                        }
                        placeholder="SQL username"
                    />
                </div>

                <div className="database-settings-field">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={settings.password}
                        onChange={(e) =>
                            update(
                                'password',
                                e.target.value
                            )
                        }
                        placeholder="SQL password"
                    />
                </div>

                <label className="database-settings-checkbox">
                <input
                    type="checkbox"
                    checked={
                        settings.useWindowsAuthentication
                    }
                    onChange={(e) =>
                        update(
                            'useWindowsAuthentication',
                            e.target.checked
                        )
                    }
                />
                    Use Windows Authentication
                </label>

                <label className="database-settings-checkbox">
                <input
                    type="checkbox"
                    checked={
                        settings.trustServerCertificate
                    }
                    onChange={(e) =>
                        update(
                            'trustServerCertificate',
                            e.target.checked
                        )
                    }
                />
                    Trust Server Certificate
                </label>

                {message && (
                    <div className="settings-message success">
                        ✓ {message}
                    </div>
                )}

                {error && (
                    <div className="settings-message error">
                        ✕ {error}
                    </div>
                )}

                <button
                    type="button"
                    className="database-settings-button"
                    onClick={testConnection}
                    disabled={testing || saving}
                >
                    {testing
                        ? 'Testing...'
                        : 'Test Connection'}
                </button>
                
                <button
                    type="button"
                    className="database-settings-button"
                    onClick={saveSettings}
                    disabled={testing || saving}
                >
                    {saving
                        ? 'Saving...'
                        : 'Save Settings'}
                </button>

            </form>

        </section>
    );
};

export default DBSettings;