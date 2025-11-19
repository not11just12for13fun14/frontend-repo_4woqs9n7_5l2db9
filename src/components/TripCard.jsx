import React from 'react'
import LiveDot from './LiveDot'

function Badge({ children, className='' }) {
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${className}`}>{children}</span>
}

function Value({ label, value, suffix='', className='' }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-wide text-slate-500">{label}</span>
      <span className={`text-sm font-semibold text-slate-900 ${className}`}>
        {value !== null && value !== undefined ? (
          <>
            {value}{suffix}
          </>
        ) : (
          <span className="text-slate-400">—</span>
        )}
      </span>
    </div>
  )
}

function TripCard({ trip, live=false }) {
  const isScheduled = trip.scheduled
  return (
    <div className={`rounded-xl border p-3 flex items-center justify-between ${isScheduled ? 'bg-sky-50/80 border-sky-200' : 'bg-emerald-50/70 border-emerald-200'}`}>
      <div className="flex items-center gap-3">
        {!isScheduled && <LiveDot />}
        <div>
          <div className="text-sm font-semibold text-slate-900">
            {trip.eta_min !== null && trip.eta_min !== undefined ? `${trip.eta_min} min` : '—'}
          </div>
          <div className="text-xs text-slate-500">ETA</div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {!isScheduled ? (
          <>
            <Value label="Occupancy" value={trip.occupancy} suffix={typeof trip.occupancy === 'number' ? '%' : ''} />
            <Value label="Delay" value={trip.delay_min} suffix={typeof trip.delay_min === 'number' ? ' min' : ''} />
          </>
        ) : (
          <Badge className="bg-sky-200 text-sky-800">Scheduled</Badge>
        )}
      </div>
    </div>
  )
}

export default TripCard
