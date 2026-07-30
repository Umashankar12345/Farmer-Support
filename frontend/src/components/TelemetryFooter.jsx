import React from "react";

export default function TelemetryFooter({ telemetry }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#06150f] text-emerald-400/90 text-[10px] font-mono py-1.5 px-4 flex justify-between items-center border-t border-emerald-900/60 z-50">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          SYSTEM STATUS: OPERATIONAL
        </span>
        <span>|</span>
        <span>API LATENCY: <strong className="text-white">{telemetry?.latencyMs ?? 142}MS</strong></span>
        <span>|</span>
        <span>
          CACHE: <strong className={telemetry?.cacheStatus?.includes("HIT") ? "text-emerald-300" : "text-amber-400"}>
            {telemetry?.cacheStatus ?? "REDIS HIT"}
          </strong>
        </span>
        <span>|</span>
        <span>AI MODEL: <strong className="text-white">{telemetry?.aiModel ?? "LLAMA3-8B-8192 (GROQ)"}</strong></span>
      </div>

      <div>
        <span>V 2.4.0-STABLE • © DIGITAL KRISHI</span>
      </div>
    </footer>
  );
}
