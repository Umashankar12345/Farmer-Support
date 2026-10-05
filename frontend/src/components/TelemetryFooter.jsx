import React from "react";

export default function TelemetryFooter({ telemetry }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#06150f] text-emerald-300 text-xs sm:text-sm font-sans py-2 px-4 flex justify-between items-center border-t border-emerald-900/60 z-50">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 font-bold text-emerald-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          SYSTEM STATUS: ONLINE
        </span>
        <span className="hidden sm:inline text-emerald-700">|</span>
        <span className="hidden sm:inline">
          API LATENCY: <strong className="text-white font-mono">{telemetry?.latencyMs ?? 142}MS</strong>
        </span>
        <span className="hidden sm:inline text-emerald-700">|</span>
        <span className="hidden sm:inline">
          CACHE: <strong className="text-emerald-300 font-mono">{telemetry?.cacheStatus ?? "REDIS ACTIVE"}</strong>
        </span>
      </div>

      <div className="text-xs font-bold text-emerald-400">
        <span>V 2.4.0 • DIGITAL KRISHI</span>
      </div>
    </footer>
  );
}
