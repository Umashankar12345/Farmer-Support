import React, { useState, useEffect, useRef } from "react";

export default function VoiceQuery({ onTelemetryUpdate }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [tokensPerSec, setTokensPerSec] = useState(0);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "hi-IN"; // Hindi / Hinglish voice support

      recognition.onresult = (event) => {
        const text = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setTranscript(text);
      };

      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return alert("Speech recognition not supported in this browser.");
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const processVoiceQuery = async () => {
    if (!transcript.trim()) return;

    const startTime = performance.now();
    setAiResponse("Analyzing agronomic query...");

    try {
      const response = await fetch("http://localhost:5000/api/ai/groq-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: transcript }),
      });

      const data = await response.json();
      const endTime = performance.now();

      const totalTimeSec = (endTime - startTime) / 1000;
      const estimatedTokens = data.answer.split(" ").length * 1.33; // Standard token calculation
      const tps = (estimatedTokens / totalTimeSec).toFixed(1);

      setTokensPerSec(tps);
      setAiResponse(data.answer);

      if (onTelemetryUpdate) {
        onTelemetryUpdate({
          latencyMs: Math.round(endTime - startTime),
          tokensPerSec: tps,
          aiModel: "LLaMA3-8B-8192 (Groq)"
        });
      }
    } catch (err) {
      setAiResponse("Failed to process voice query. Check network connection.");
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          🎙️ Hands-Free Voice Advisory
        </h3>
        {tokensPerSec > 0 && (
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
            {tokensPerSec} tokens/sec
          </span>
        )}
      </div>

      <div className="flex gap-2 mb-3">
        <button
          onClick={toggleListening}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            isListening
              ? "bg-rose-500 text-white animate-pulse"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
        >
          {isListening ? "🛑 Listening..." : "🎤 Speak Query"}
        </button>

        <button
          onClick={processVoiceQuery}
          disabled={!transcript || isListening}
          className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl disabled:opacity-40"
        >
          Ask AI
        </button>
      </div>

      <p className="text-xs bg-slate-50 p-3 rounded-xl text-slate-600 min-h-[40px] border border-slate-100 mb-2">
        {transcript || "Click speak and ask a question (e.g., Wheat NPK requirements in Rajasthan)"}
      </p>

      {aiResponse && (
        <div className="bg-emerald-50/50 border border-emerald-200 p-3 rounded-xl text-xs text-slate-700">
          <strong>AI Response:</strong> {aiResponse}
        </div>
      )}
    </div>
  );
}
