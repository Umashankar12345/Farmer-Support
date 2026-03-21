import React, { useState } from 'react';
import DiseaseDetector from '../../components/ImageAnalysis/DiseaseDetector';
import SymptomChecker from './components/SymptomChecker';
import TreatmentPlanner from './components/TreatmentPlanner';
import {
  Camera,
  Search,
  AlertTriangle,
  Sprout,
  Calendar,
  Download,
  Share2,
  CheckCircle,
  Bug
} from 'lucide-react';

const PestDisease = () => {
  const [activeTab, setActiveTab] = useState('scanner');

  const tabs = [
    { id: 'scanner', label: 'Disease Scanner', icon: Camera },
    { id: 'symptoms', label: 'Symptom Checker', icon: Search },
    { id: 'treatment', label: 'Treatment Planner', icon: Sprout }
  ];

  const commonDiseases = [
    { name: 'Tomato Blight', severity: 'High', icon: '🍅' },
    { name: 'Powdery Mildew', severity: 'Medium', icon: '🍃' },
    { name: 'Root Rot', severity: 'Critical', icon: '🌱' },
    { name: 'Aphid Infestation', severity: 'Medium', icon: '🐛' }
  ];

  const preventionTips = [
    'Rotate crops annually',
    'Use disease-resistant varieties',
    'Maintain proper spacing',
    'Water at soil level',
    'Remove infected plants immediately'
  ];

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold text-slate-800 mb-3 flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg text-red-600">
              <AlertTriangle size={32} />
            </div>
            Pest & Disease Management
          </h1>
          <p className="text-slate-600 text-lg">
            Detect, identify, and treat plant diseases with AI-powered tools and expert recommendations
          </p>
        </div>
        <div className="flex gap-6">
          <div className="bg-slate-50 px-6 py-4 rounded-xl border border-slate-100 text-center min-w-[120px]">
            <span className="block text-2xl font-bold text-green-600">95%</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Accuracy</span>
          </div>
          <div className="bg-slate-50 px-6 py-4 rounded-xl border border-slate-100 text-center min-w-[120px]">
            <span className="block text-2xl font-bold text-blue-600">50+</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Diseases</span>
          </div>
          <div className="bg-slate-50 px-6 py-4 rounded-xl border border-slate-100 text-center min-w-[120px]">
            <span className="block text-2xl font-bold text-purple-600">24/7</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Support</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === tab.id
                  ? 'bg-green-600 text-white shadow-md shadow-green-200'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-[2.5] min-w-0">
          {activeTab === 'scanner' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px]">
              <DiseaseDetector />
            </div>
          )}

          {activeTab === 'symptoms' && (
            <SymptomChecker />
          )}

          {activeTab === 'treatment' && (
            <TreatmentPlanner />
          )}
        </div>

        <div className="lg:flex-1 space-y-6 w-full lg:w-auto">
          {/* Common Diseases */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Bug size={18} className="text-slate-400" />
              Common Diseases
            </h3>
            <div className="space-y-3">
              {commonDiseases.map((disease, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <span className="text-2xl">{disease.icon}</span>
                  <div className="flex-1">
                    <span className="block font-medium text-slate-700">{disease.name}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${disease.severity === 'High' ? 'bg-red-100 text-red-700' :
                        disease.severity === 'Critical' ? 'bg-red-100 text-red-800 border border-red-200' :
                          'bg-yellow-100 text-yellow-700'
                      }`}>
                      {disease.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prevention Tips */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle size={18} className="text-slate-400" />
              Prevention Tips
            </h3>
            <ul className="space-y-3">
              {preventionTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                  <span className="bg-green-100 text-green-600 rounded-full p-0.5 mt-0.5 shrink-0">
                    <CheckCircle size={14} />
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-xl transition-colors border border-slate-200">
                <Download size={18} />
                Download Guide
              </button>
              <button className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-xl transition-colors border border-slate-200">
                <Share2 size={18} />
                Share Results
              </button>
              <button className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-xl transition-colors border border-slate-200">
                <Calendar size={18} />
                Schedule Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestDisease;