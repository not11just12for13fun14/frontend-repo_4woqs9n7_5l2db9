import React, { useEffect, useMemo, useState } from 'react'
import StopHeader from './components/StopHeader'
import RouteFilter from './components/RouteFilter'
import RouteBlock from './components/RouteBlock'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function useQuery() {
  const params = new URLSearchParams(window.location.search)
  return {
    stopId: params.get('stop') || '1', // default for demo
  }
}

function App() {
  const { stopId } = useQuery()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [selected, setSelected] = useState('all')
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`${BACKEND}/api/stops/${encodeURIComponent(stopId)}/arrivals`)
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const json = await res.json()
      setData(json)
      setLastUpdated(new Date())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const id = setInterval(fetchData, 30000) // refresh every 30s
    return () => clearInterval(id)
  }, [stopId])

  const routesMap = useMemo(() => {
    const map = {}
    if (data?.by_route) {
      data.by_route.forEach((r) => {
        map[r.route.route_id] = r
      })
    }
    return map
  }, [data])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="max-w-xl mx-auto px-4 py-4 space-y-4">
        {/* Stop header */}
        <StopHeader stop={data?.stop || { stop_id: stopId, name: `Stop ${stopId}` }} />

        {/* Filter */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 border border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">Routes</h2>
            {lastUpdated && (
              <span className="text-xs text-slate-500">Updated {lastUpdated.toLocaleTimeString()}</span>
            )}
          </div>
          <div className="mt-2">
            <RouteFilter
              routes={data?.routes || []}
              selected={selected}
              onSelect={setSelected}
            />
          </div>
        </div>

        {/* Content */}
        {loading && (
          <div className="text-center text-slate-300 py-20">Loading arrivals…</div>
        )}
        {error && (
          <div className="text-center text-rose-300 bg-rose-900/30 border border-rose-700 rounded-xl p-4">{error}</div>
        )}

        {!loading && !error && data && (
          <div className="space-y-3 pb-24">
            {(data.by_route || []).map((item) => (
              <RouteBlock key={item.route.route_id} route={item.route} data={item} filter={selected} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="pb-8 text-center text-xs text-slate-500">
          Tap a route to filter. Auto-refreshes every 30 seconds.
        </div>
      </div>
    </div>
  )
}

export default App
