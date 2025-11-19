import React from 'react'

function RouteFilter({ routes, selected, onSelect }) {
  if (!routes || routes.length === 0) return null

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onSelect('all')}
        className={`px-3 py-1.5 rounded-lg text-sm border transition ${selected === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white/70 border-slate-200 text-slate-700 hover:bg-white'}`}
      >
        All
      </button>
      {routes.map((r) => (
        <button
          key={r.route_id}
          onClick={() => onSelect(r.route_id)}
          className={`px-3 py-1.5 rounded-lg text-sm border transition flex items-center gap-2 ${selected === r.route_id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white/70 border-slate-200 text-slate-700 hover:bg-white'}`}
          title={r.long_name || r.short_name}
        >
          <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: `#${r.color || '0ea5e9'}` }}></span>
          <span className="font-semibold">{r.short_name || r.route_id}</span>
        </button>
      ))}
    </div>
  )
}

export default RouteFilter
