import React, { useState, useEffect } from 'react';

const EscalationPanel = () => {
  const [escalations, setEscalations] = useState([]);
  const [experts, setExperts] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  // Mock data
  useEffect(() => {
    // Load escalations
    const mockEscalations = [
      {
        id: 'ESC-001',
        query: "My rice plants have yellow leaves with brown spots",
        user: "Farmer Rajesh",
        location: "Punjab",
        crop: "Rice",
        timestamp: "2024-12-15 10:30",
        priority: "High",
        status: "pending",
        assignedTo: null,
        aiConfidence: 0.75,
        aiRecommendation: "Possible Brown Spot Fungus"
      },
      {
        id: 'ESC-002',
        query: "Best time to sow wheat in Haryana",
        user: "Farmer Sunita",
        location: "Haryana",
        crop: "Wheat",
        timestamp: "2024-12-14 15:45",
        priority: "Normal",
        status: "assigned",
        assignedTo: "Dr. Sharma",
        aiConfidence: 0.92,
        aiRecommendation: "October-November with proper irrigation"
      },
      {
        id: 'ESC-003',
        query: "Cotton yield dropping despite good rainfall",
        user: "Farmer Kumar",
        location: "Gujarat",
        crop: "Cotton",
        timestamp: "2024-12-13 09:20",
        priority: "High",
        status: "resolved",
        assignedTo: "Dr. Patel",
        aiConfidence: 0.68,
        aiRecommendation: "Soil nutrient deficiency suspected"
      }
    ];

    // Load experts
    const mockExperts = [
      {
        id: 1,
        name: "Dr. Rajesh Sharma",
        specialization: "Rice Pathology",
        experience: "15 years",
        availability: "Online",
        rating: 4.8,
        completedCases: 245
      },
      {
        id: 2,
        name: "Dr. Priya Patel",
        specialization: "Wheat & Cereals",
        experience: "12 years",
        availability: "Online",
        rating: 4.9,
        completedCases: 189
      },
      {
        id: 3,
        name: "Dr. Sunil Kumar",
        specialization: "Cotton & Cash Crops",
        experience: "18 years",
        availability: "Offline",
        rating: 4.7,
        completedCases: 312
      },
      {
        id: 4,
        name: "Dr. Anjali Singh",
        specialization: "Soil Science",
        experience: "10 years",
        availability: "Online",
        rating: 4.6,
        completedCases: 156
      }
    ];

    setEscalations(mockEscalations);
    setExperts(mockExperts);
  }, []);

  const handleAssignExpert = (escalationId, expertName) => {
    setEscalations(prev =>
      prev.map(esc =>
        esc.id === escalationId
          ? { ...esc, status: 'assigned', assignedTo: expertName }
          : esc
      )
    );
  };

  const handleResolve = (escalationId) => {
    setEscalations(prev =>
      prev.map(esc =>
        esc.id === escalationId
          ? { ...esc, status: 'resolved' }
          : esc
      )
    );
  };

  const filteredEscalations = escalations.filter(esc => 
    activeTab === 'all' ? true : esc.status === activeTab
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">AI + Human Escalation System</h3>
          <p className="text-gray-600">When AI needs human expertise</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            {escalations.filter(e => e.status === 'pending').length} Pending
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            {experts.filter(e => e.availability === 'Online').length} Experts Online
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Escalations */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex space-x-1 border-b mb-4">
            {['pending', 'assigned', 'resolved', 'all'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab} ({escalations.filter(e => tab === 'all' ? true : e.status === tab).length})
              </button>
            ))}
          </div>

          {/* Escalations List */}
          <div className="space-y-4">
            {filteredEscalations.map(esc => (
              <div key={esc.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{esc.id}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        esc.priority === 'High' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {esc.priority} Priority
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        esc.status === 'pending' ? 'bg-gray-100 text-gray-700' :
                        esc.status === 'assigned' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {esc.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{esc.timestamp} • {esc.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{esc.crop}</div>
                    <div className="text-sm text-gray-600">AI Confidence: {(esc.aiConfidence * 100).toFixed(0)}%</div>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="font-medium mb-1">Query:</p>
                  <p className="text-gray-700">{esc.query}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <p className="font-medium mb-1 flex items-center">
                    <span className="mr-2">🤖</span>
                    AI Preliminary Analysis
                  </p>
                  <p className="text-gray-700">{esc.aiRecommendation}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <span className="mr-4">Confidence: {(esc.aiConfidence * 100).toFixed(0)}%</span>
                    <span>Trigger: Low confidence threshold</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    {esc.assignedTo ? (
                      <div className="flex items-center">
                        <span className="mr-2">👨‍🌾</span>
                        <span>Assigned to: <strong>{esc.assignedTo}</strong></span>
                      </div>
                    ) : (
                      <span className="text-gray-600">Awaiting expert assignment</span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {esc.status === 'pending' && (
                      <button
                        onClick={() => {
                          const availableExpert = experts.find(e => e.availability === 'Online');
                          if (availableExpert) {
                            handleAssignExpert(esc.id, availableExpert.name);
                          }
                        }}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        Assign Expert
                      </button>
                    )}
                    {esc.status === 'assigned' && (
                      <button
                        onClick={() => handleResolve(esc.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                      >
                        Mark Resolved
                      </button>
                    )}
                    <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Experts */}
        <div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 mb-6">
            <h4 className="font-bold text-lg mb-3 flex items-center">
              <span className="mr-2">👨‍🌾</span>
              Available Experts
            </h4>
            <div className="space-y-4">
              {experts.map(expert => (
                <div key={expert.id} className="bg-white p-4 rounded-lg border">
                  <div className="flex items-start mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xl">👨‍⚕️</span>
                    </div>
                    <div>
                      <h5 className="font-bold">{expert.name}</h5>
                      <p className="text-sm text-gray-600">{expert.specialization}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">⭐</span>
                      <span>{expert.rating}/5</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">📅</span>
                      <span>{expert.experience}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">✅</span>
                      <span>{expert.completedCases} cases</span>
                    </div>
                    <div className={`flex items-center ${
                      expert.availability === 'Online' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-1 ${
                        expert.availability === 'Online' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></span>
                      <span>{expert.availability}</span>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    Contact Expert
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-bold mb-3">Escalation Statistics</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">AI Accuracy</span>
                  <span className="text-sm font-bold">87%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Avg. Response Time</span>
                  <span className="text-sm font-bold">45 mins</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Resolution Rate</span>
                  <span className="text-sm font-bold">94%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <h5 className="font-medium mb-2">Escalation Triggers</h5>
              <ul className="text-sm space-y-1 text-gray-600">
                <li className="flex items-center">
                  <span className="mr-2">⚡</span>
                  AI confidence below 70%
                </li>
                <li className="flex items-center">
                  <span className="mr-2">⚠️</span>
                  Emergency/urgent keywords
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🔍</span>
                  Complex multi-crop issues
                </li>
                <li className="flex items-center">
                  <span className="mr-2">💬</span>
                  User requests human expert
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscalationPanel;