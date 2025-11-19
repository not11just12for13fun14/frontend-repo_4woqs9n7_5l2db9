import React from 'react'

function LiveDot({ pulse = true, className = '' }) {
  return (
    <span className={`inline-flex items-center ${className}`} title="Live">
      <span className={`relative flex h-2.5 w-2.5 mr-1.5`}> 
        {pulse && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        )}
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </span>
      <span className="text-xs text-emerald-600">live</span>
    </span>
  )
}

export default LiveDot
