import React, { useState } from "react";

export default function OnboardingJourney({ onOnboardingComplete }) {
  const [currentStep, setCurrentStep] = useState(2); // Step 2 is active in the design
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic state for onboarding parameters
  const [formData, setFormData] = useState({
    state: "Bihar",
    fieldName: "",
    areaAcres: 5,
    soilType: "Sandy Loam",
    irrigation: "Drip",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "areaAcres" ? Number(value) : value,
    }));
  };

  const handleNextStep = async () => {
    if (currentStep === 1) {
      if (!formData.state) return alert("Please select a state.");
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.fieldName.trim()) {
        alert("Please enter a valid field name.");
        return;
      }

      setIsSubmitting(true);
      try {
        // Send actual field metadata to Express backend
        const response = await fetch("http://localhost:5000/api/journey/setup-field", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setCurrentStep(3); // Advance to Step 3: AI Recommendation
        } else {
          alert(data.message || "Failed to save field details.");
        }
      } catch (err) {
        console.error("Onboarding submission error:", err);
      } finally {
        setIsSubmitting(false);
      }
    } else if (currentStep === 3) {
      if (onOnboardingComplete) {
        onOnboardingComplete(formData);
      }
    }
  };

  return (
    <div className="p-6 bg-[#f1f5f3] min-h-screen font-sans text-gray-800">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <span>🚀</span> Farmer Journey — Onboarding Flow
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          3-step smart setup: State → First Field → AI Recommendation
        </p>
      </div>

      {/* Main Dark Green Outer Container */}
      <div className="max-w-4xl mx-auto bg-[#073824] text-white p-8 rounded-3xl shadow-2xl border border-emerald-900">
        
        {/* Step Progress Header */}
        <div className="flex justify-between items-center mb-10 max-w-2xl mx-auto relative px-4">
          {/* Connector Bar Background */}
          <div className="absolute top-4 left-10 right-10 h-0.5 bg-emerald-800/80 z-0"></div>

          {/* Active Connector Progress */}
          <div
            className="absolute top-4 left-10 h-0.5 bg-emerald-400 z-0 transition-all duration-300"
            style={{
              width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%",
            }}
          ></div>

          {/* Step 1 Node */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                currentStep > 1
                  ? "bg-emerald-500 text-slate-950"
                  : currentStep === 1
                  ? "bg-emerald-400 text-slate-950 ring-4 ring-emerald-900"
                  : "bg-emerald-950 text-emerald-700"
              }`}
            >
              {currentStep > 1 ? "✓" : "1"}
            </div>
            <span className="text-[11px] font-semibold text-emerald-200 mt-2">
              Select State
            </span>
          </div>

          {/* Step 2 Node */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                currentStep > 2
                  ? "bg-emerald-500 text-slate-950"
                  : currentStep === 2
                  ? "bg-[#073824] border-2 border-emerald-400 text-emerald-300 ring-4 ring-emerald-900"
                  : "bg-emerald-950 text-emerald-700"
              }`}
            >
              {currentStep > 2 ? "✓" : "2"}
            </div>
            <span className="text-[11px] font-bold text-emerald-100 mt-2">
              Add First Field
            </span>
          </div>

          {/* Step 3 Node */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                currentStep === 3
                  ? "bg-emerald-400 text-slate-950 ring-4 ring-emerald-900"
                  : "bg-emerald-950 text-emerald-700"
              }`}
            >
              3
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 mt-2">
              AI Recommendation
            </span>
          </div>
        </div>

        {/* Step 2 Form Card */}
        {currentStep === 2 && (
          <div className="bg-[#0b4a33]/70 p-6 rounded-2xl border border-emerald-700/40 backdrop-blur-md">
            <h2 className="text-lg font-bold mb-1 text-white">Add your first field</h2>
            <p className="text-xs text-emerald-200/80 mb-6">
              Tell us about your land — we'll auto-schedule your first soil test reminder
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {/* Field Name */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-emerald-200/90 mb-2">
                  FIELD NAME
                </label>
                <input
                  type="text"
                  name="fieldName"
                  value={formData.fieldName}
                  onChange={handleInputChange}
                  placeholder="e.g. Main Plot A"
                  className="w-full bg-[#052d1d] border border-emerald-700/60 rounded-xl px-4 py-3 text-xs text-white placeholder-emerald-600 focus:outline-none focus:border-emerald-400 transition"
                />
              </div>

              {/* Area */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-emerald-200/90 mb-2">
                  AREA (ACRES)
                </label>
                <input
                  type="number"
                  name="areaAcres"
                  value={formData.areaAcres}
                  onChange={handleInputChange}
                  min="0.1"
                  step="0.1"
                  className="w-full bg-[#052d1d] border border-emerald-700/60 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition"
                />
              </div>

              {/* Soil Type */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-emerald-200/90 mb-2">
                  SOIL TYPE
                </label>
                <select
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleInputChange}
                  className="w-full bg-[#052d1d] border border-emerald-700/60 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition cursor-pointer"
                >
                  <option value="Sandy Loam">Sandy Loam</option>
                  <option value="Clay Loam">Clay Loam</option>
                  <option value="Black Soil">Black Soil (Regur)</option>
                  <option value="Alluvial">Alluvial</option>
                  <option value="Red Soil">Red Soil</option>
                </select>
              </div>

              {/* Irrigation */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-emerald-200/90 mb-2">
                  IRRIGATION
                </label>
                <select
                  name="irrigation"
                  value={formData.irrigation}
                  onChange={handleInputChange}
                  className="w-full bg-[#052d1d] border border-emerald-700/60 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition cursor-pointer"
                >
                  <option value="Drip">Drip</option>
                  <option value="Canal">Canal</option>
                  <option value="Borewell / Sprinkler">Borewell / Sprinkler</option>
                  <option value="Rainfed">Rainfed</option>
                </select>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-end">
              <button
                onClick={handleNextStep}
                disabled={isSubmitting}
                className="bg-[#10b981] hover:bg-[#059669] text-slate-950 font-bold text-xs px-6 py-3 rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Continue →"}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: AI Recommendation Step Placeholder */}
        {currentStep === 3 && (
          <div className="bg-[#0b4a33]/70 p-6 rounded-2xl border border-emerald-700/40 text-center">
            <h2 className="text-lg font-bold mb-2">✨ Generating Agro-Intelligence</h2>
            <p className="text-xs text-emerald-200 mb-6">
              Field <strong>{formData.fieldName}</strong> ({formData.areaAcres} Acres, {formData.soilType}) saved. Initializing KNN Crop Recommender and Sentinel-2 satellite polygon...
            </p>
            <button
              onClick={handleNextStep}
              className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl transition"
            >
              Enter Farm Dashboard →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
