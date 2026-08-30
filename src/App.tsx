import { useEffect, useState } from 'react'
import Dashboard from './Pages/Overview'
import Stats from './Pages/Stats'
import DBSettings from './Pages/DBSettings'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState(
    window.location.hash || '#/'
  )

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(window.location.hash || '#/')
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <div className="app-layout">

        <aside className="sidenav">

        <div className="sidenav-logo">
            CSECloud
        </div>

        <nav className="sidenav-menu">

            <a
            href="#/"
            className={`sidenav-link ${
                currentPage === '#/' ? 'active' : ''
            }`}
            >
            Dashboard
            </a>

            <a
            href="#/stats"
            className={`sidenav-link ${
                currentPage === '#/stats' ? 'active' : ''
            }`}
            >
            Stats
            </a>

            <a
            href="#/dbsettings"
            className={`sidenav-link ${
                currentPage === '#/dbsettings' ? 'active' : ''
            }`}
            >
            Database Settings
            </a>

        </nav>

        </aside>

        <main className="dashboard">
            {currentPage === "#/stats" ? (
                <Stats />
            ) : currentPage === "#/dbsettings" ? (
                <DBSettings />
            ) : (
                <Dashboard />
            )}
        </main>

    </div>
  )
}

export default App
