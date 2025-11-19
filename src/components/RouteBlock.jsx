import React from 'react'
import TripCard from './TripCard'

function RouteBlock({ route, data, filter }) {
  if (!route) return null
  const show = !filter || filter === 'all' || filter === route.route_id
  if (!show) return null

  const liveTrips = (data?.live || [])
  const scheduledTrips = (data?.scheduled || [])

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: `#${route.color || '0ea5e9'}` }}></span>
          <h3 className="text-lg font-bold text-slate-900">{route.short_name || route.route_id}</h3>
          {route.long_name && (
            <span className="text-sm text-slate-500">{route.long_name}</span>
          )}
        </div>
      </div>

      {liveTrips.length === 0 && scheduledTrips.length === 0 && (
        <div className="text-sm text-slate-500">No upcoming trips found for this route.</div>
      )}

      {/* Live trips */}
      {liveTrips.length > 0 && (
        <div className="space-y-2">
          {liveTrips.map((t, idx) => (
            <TripCard key={`l-${idx}`} trip={t} live />
          ))}
        </div>
      )}

      {/* Scheduled trips */}
      {scheduledTrips.length > 0 && (
        <div className="space-y-2">
          {scheduledTrips.map((t, idx) => (
            <TripCard key={`s-${idx}`} trip={t} />
          ))}
        </div>
      )}
    </div>
  )
}

export default RouteBlock
