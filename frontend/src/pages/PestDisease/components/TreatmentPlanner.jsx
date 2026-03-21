import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Download,
  Share2,
  Repeat,
  Sprout,
  Droplets,
  Sun,
  Wind,
  Shield,
  FlaskConical
} from 'lucide-react';

const TreatmentPlanner = () => {
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [schedule, setSchedule] = useState({
    startDate: new Date().toISOString().split('T')[0],
    duration: '2',
    frequency: 'weekly'
  });

  const treatments = [
    {
      id: 'organic',
      name: 'Organic Treatment',
      description: 'Natural remedies using neem oil, baking soda, and companion planting',
      duration: '2-4 weeks',
      cost: 'Low',
      effectiveness: 'Medium',
      frequency: 'Weekly application',
      icon: <Sprout size={24} className="text-green-600" />,
      steps: [
        'Mix neem oil with water (2ml per liter)',
        'Spray on affected areas',
        'Repeat weekly for 3 weeks'
      ],
      requirements: ['Neem oil', 'Spray bottle', 'Protective gloves']
    },
    {
      id: 'chemical',
      name: 'Chemical Treatment',
      description: 'Fast-acting chemical fungicides and pesticides',
      duration: '1-2 weeks',
      cost: 'High',
      effectiveness: 'High',
      frequency: 'Every 3 days',
      icon: <FlaskConical size={24} className="text-purple-600" />,
      steps: [
        'Apply recommended fungicide',
        'Follow safety precautions',
        'Wait 7 days before harvest'
      ],
      requirements: ['Chemical fungicide', 'Protective gear', 'Measuring tools']
    },
    {
      id: 'integrated',
      name: 'Integrated Pest Management',
      description: 'Combination of cultural, biological, and chemical controls',
      duration: '4-6 weeks',
      cost: 'Medium',
      effectiveness: 'High',
      frequency: 'Custom schedule',
      icon: <Shield size={24} className="text-blue-600" />,
      steps: [
        'Remove infected plant parts',
        'Introduce beneficial insects',
        'Apply targeted treatments'
      ],
      requirements: ['Multiple approaches', 'Monitoring tools', 'Patience']
    }
  ];

  const environmentalFactors = [
    { icon: Sun, label: 'Sunlight', value: '6-8 hours daily' },
    { icon: Droplets, label: 'Watering', value: 'Keep soil moist' },
    { icon: Wind, label: 'Air Circulation', value: 'Good airflow needed' },
    { icon: Sprout, label: 'Soil pH', value: '6.0-7.0 optimal' }
  ];

  const generateSchedule = () => {
    // Generate treatment schedule based on selected options
    const schedule = {
      treatment: selectedTreatment,
      plan: [
        { day: 1, task: 'Initial application', notes: 'Follow mixing instructions' },
        { day: 3, task: 'First follow-up', notes: 'Check for improvements' },
        { day: 7, task: 'Second application', notes: 'Adjust concentration if needed' },
        { day: 14, task: 'Evaluation', notes: 'Assess treatment effectiveness' }
      ]
    };
    return schedule;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Calendar className="text-green-600" />
          Treatment Planner
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Plan and schedule your plant treatment with step-by-step guidance
        </p>
      </div>

      <div className="p-6">
        {/* Treatment Options */}
        <div className="mb-10">
          <h3 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Select Treatment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {treatments.map(treatment => (
              <div
                key={treatment.id}
                className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${selectedTreatment?.id === treatment.id
                    ? 'border-green-500 bg-green-50 ring-1 ring-green-500'
                    : 'border-slate-200 bg-white hover:border-green-300 hover:shadow-md'
                  }`}
                onClick={() => setSelectedTreatment(treatment)}
              >
                {selectedTreatment?.id === treatment.id && (
                  <div className="absolute top-3 right-3 text-green-600">
                    <CheckCircle size={20} className="fill-green-100" />
                  </div>
                )}

                <div className="mb-3 bg-white w-12 h-12 rounded-lg border border-slate-100 flex items-center justify-center shadow-sm">
                  {treatment.icon}
                </div>

                <h4 className="font-bold text-slate-800 mb-2">{treatment.name}</h4>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">{treatment.description}</p>

                <div className="space-y-2 mt-auto">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Clock size={14} className="text-slate-400" />
                    <span>{treatment.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <DollarSign size={14} className="text-slate-400" />
                    <span>Cost: <span className="font-medium">{treatment.cost}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <AlertTriangle size={14} className="text-slate-400" />
                    <span>Effectiveness: <span className="font-medium">{treatment.effectiveness}</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedTreatment && (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8">
            {/* Detailed Plan & Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left Column: Requirements & Steps */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">1</span>
                    Implementation Steps
                  </h4>
                  <ul className="space-y-4">
                    {selectedTreatment.steps.map((step, index) => (
                      <li key={index} className="flex gap-3 text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                        <div className="font-bold text-green-600 min-w-[20px]">{index + 1}.</div>
                        {step}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <h5 className="font-bold text-slate-700 mb-3 text-sm">Required Items</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedTreatment.requirements.map((req, index) => (
                        <span key={index} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Generated Schedule Timeline */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-800">Generated Schedule</h3>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors" title="Export">
                        <Download size={18} />
                      </button>
                      <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors" title="Share">
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="relative pl-4 border-l-2 border-slate-100 space-y-8">
                    {generateSchedule().plan.map((item, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-green-500 ring-4 ring-white"></div>
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 ml-2">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-bold text-slate-700 text-sm">{item.task}</span>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Day {item.day}</span>
                          </div>
                          <p className="text-xs text-slate-500">{item.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Settings & Env */}
              <div className="space-y-6">
                {/* Schedule Settings */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-4 text-sm">Schedule Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Start Date</label>
                      <input
                        type="date"
                        value={schedule.startDate}
                        onChange={(e) => setSchedule({ ...schedule, startDate: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Duration (weeks)</label>
                      <select
                        value={schedule.duration}
                        onChange={(e) => setSchedule({ ...schedule, duration: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-green-500"
                      >
                        {[1, 2, 3, 4, 5, 6].map(week => (
                          <option key={week} value={week}>{week} week{week > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Frequency</label>
                      <select
                        value={schedule.frequency}
                        onChange={(e) => setSchedule({ ...schedule, frequency: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-green-500"
                      >
                        <option value="daily">Daily</option>
                        <option value="every_other_day">Every Other Day</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Environmental Considerations */}
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                  <h3 className="font-bold text-blue-900 mb-4 text-sm">Environmental Factors</h3>
                  <div className="space-y-3">
                    {environmentalFactors.map((factor, index) => {
                      const Icon = factor.icon;
                      return (
                        <div key={index} className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-blue-100/50">
                          <div className="text-blue-500 bg-blue-50 p-1.5 rounded-md">
                            <Icon size={16} />
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">{factor.label}</div>
                            <div className="text-sm font-semibold text-slate-700">{factor.value}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Precautions */}
                <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
                  <h3 className="font-bold text-orange-800 mb-3 text-sm flex items-center gap-2">
                    <AlertTriangle size={16} /> Important Precautions
                  </h3>
                  <ul className="text-xs text-orange-900/80 space-y-2 list-disc list-outside pl-4">
                    <li>Always wear protective gear when handling chemicals</li>
                    <li>Test treatment on small area first</li>
                    <li>Follow waiting period before harvest</li>
                    <li>Store chemicals safely away from children</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentPlanner;