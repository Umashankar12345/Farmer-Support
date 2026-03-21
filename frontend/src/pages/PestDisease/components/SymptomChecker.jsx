import React, { useState } from 'react';
import {
  Search,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  Stethoscope,
  Info
} from 'lucide-react';

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);

  const symptomsByCategory = [
    {
      category: 'Leaf Symptoms',
      symptoms: [
        { id: 'yellowing', name: 'Yellowing leaves', icon: '🍂' },
        { id: 'spots', name: 'Brown/black spots', icon: '⚫' },
        { id: 'curling', name: 'Leaf curling', icon: '🌀' },
        { id: 'wilting', name: 'Wilting leaves', icon: '🥀' },
        { id: 'powdery', name: 'White powdery coating', icon: '❄️' }
      ]
    },
    {
      category: 'Stem & Root Symptoms',
      symptoms: [
        { id: 'rot', name: 'Stem/root rot', icon: '🌱' },
        { id: 'cankers', name: 'Cankers on stems', icon: '🪵' },
        { id: 'discoloration', name: 'Stem discoloration', icon: '🎨' }
      ]
    },
    {
      category: 'Fruit/Flower Symptoms',
      symptoms: [
        { id: 'blossom', name: 'Blossom drop', icon: '🌸' },
        { id: 'fruit_rot', name: 'Fruit rot', icon: '🍎' },
        { id: 'deformity', name: 'Fruit deformity', icon: '🔶' }
      ]
    },
    {
      category: 'Growth Symptoms',
      symptoms: [
        { id: 'stunted', name: 'Stunted growth', icon: '📏' },
        { id: 'discolored', name: 'Discolored growth', icon: '🌈' }
      ]
    }
  ];

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const checkSymptoms = () => {
    // Mock analysis based on selected symptoms
    const mockResults = {
      possibleDiseases: [
        {
          name: 'Early Blight',
          confidence: 85,
          symptoms: ['Brown spots', 'Yellowing leaves'],
          treatments: ['Remove infected leaves', 'Apply fungicide'],
          severity: 'Medium'
        },
        {
          name: 'Powdery Mildew',
          confidence: 75,
          symptoms: ['White powdery coating', 'Leaf curling'],
          treatments: ['Improve air circulation', 'Neem oil spray'],
          severity: 'Low'
        }
      ],
      recommendations: [
        'Isolate affected plants',
        'Improve watering practices',
        'Apply organic fungicide'
      ]
    };

    setResults(mockResults);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Stethoscope className="text-blue-500" />
          Symptom Checker
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Select symptoms to identify potential diseases and get treatment recommendations
        </p>
      </div>

      <div className="p-6">
        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for specific symptoms (e.g. yellow spots)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        </div>

        {/* Selected Symptoms */}
        {selectedSymptoms.length > 0 && (
          <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-blue-900 text-sm uppercase tracking-wider">Selected Symptoms ({selectedSymptoms.length})</h4>
              <button
                onClick={() => setSelectedSymptoms([])}
                className="text-blue-600 text-xs hover:underline"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSymptoms.map(symptomId => {
                const symptom = symptomsByCategory
                  .flatMap(cat => cat.symptoms)
                  .find(s => s.id === symptomId);

                return symptom ? (
                  <div key={symptomId} className="flex items-center gap-2 px-3 py-1.5 bg-white text-blue-800 rounded-lg shadow-sm border border-blue-100 text-sm">
                    <span>{symptom.icon}</span>
                    <span className="font-medium">{symptom.name}</span>
                    <button
                      onClick={() => toggleSymptom(symptomId)}
                      className="ml-1 text-slate-400 hover:text-red-500 rounded-full p-0.5 hover:bg-red-50 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ) : null;
              })}
            </div>
            <button
              onClick={checkSymptoms}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-200"
            >
              Analyze Symptoms
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Symptom Categories */}
        <div className="space-y-8">
          {symptomsByCategory.map(category => (
            <div key={category.category}>
              <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                {category.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.symptoms.map(symptom => (
                  <button
                    key={symptom.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${selectedSymptoms.includes(symptom.id)
                        ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-300'
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
                      }`}
                    onClick={() => toggleSymptom(symptom.id)}
                  >
                    <span className="text-2xl">{symptom.icon}</span>
                    <span className={`font-medium flex-1 ${selectedSymptoms.includes(symptom.id) ? 'text-blue-900' : 'text-slate-700'}`}>
                      {symptom.name}
                    </span>
                    {selectedSymptoms.includes(symptom.id) && (
                      <CheckCircle size={18} className="text-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Results Section */}
        {results && (
          <div className="mt-8 pt-8 border-t border-slate-200 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <AlertTriangle className="text-orange-500" />
                Analysis Results
              </h3>
              <button
                onClick={() => setResults(null)}
                className="text-slate-500 hover:text-slate-800 text-sm"
              >
                Clear Results
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {results.possibleDiseases.map((disease, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-lg text-slate-800">{disease.name}</h4>
                    <div className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-bold">
                      {disease.confidence}% match
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Matching Symptoms</span>
                      <div className="flex flex-wrap gap-1.5">
                        {disease.symptoms.map((sym, i) => (
                          <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                            {sym}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Recommended Treatments</span>
                      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                        {disease.treatments.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Severity</span>
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${disease.severity === 'High' ? 'bg-red-100 text-red-700' :
                          disease.severity === 'Medium' ? 'bg-orange-100 text-orange-700' :
                            'bg-yellow-100 text-yellow-700'
                        }`}>
                        {disease.severity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Info size={18} /> General Recommendations
              </h4>
              <ul className="space-y-2">
                {results.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-blue-800 text-sm">
                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-blue-500" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;