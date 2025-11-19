import React from 'react'

function StopHeader({ stop }) {
  if (!stop) return null
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{stop.name || `Stop ${stop.stop_id}`}</h1>
          <p className="text-sm text-slate-600">
            {stop.code ? `Code: ${stop.code}` : null}
            {stop.desc ? ` • ${stop.desc}` : null}
          </p>
        </div>
        <div className="text-right">
          {stop.lat && stop.lon ? (
            <p className="text-xs text-slate-500">{Number(stop.lat).toFixed(5)}, {Number(stop.lon).toFixed(5)}</p>
          ) : null}
          <p className="text-xs text-slate-400">Updated just now</p>
        </div>
      </div>
    </div>
  )
}

export default StopHeader
