import React, { useState } from 'react';

const MarketAdvisorPrototype = () => {
  const [step, setStep] = useState('auth'); // auth or chat
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  
  const [user, setUser] = useState(null);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/prototype/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, village })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');
      setUser(data.user);
      setStep('chat');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/prototype/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      setUser(data.user);
      setStep('chat');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch('/api/prototype/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: user.phone, question, commodity: 'Wheat', quantity: 50 })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch advice');
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Market Advisor Prototype</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}

      {step === 'auth' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Signup Form */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Simulate New Farmer Signup</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  className="w-full border p-2 rounded" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Phone Number (Key)</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  className="w-full border p-2 rounded" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Village (Triggers Geocoding)</label>
                <select 
                  value={village} 
                  onChange={e => setVillage(e.target.value)} 
                  className="w-full border p-2 rounded"
                >
                  <option value="Neemrana">Neemrana, Alwar</option>
                  <option value="Alwar">Alwar City</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Gurgaon">Gurgaon</option>
                </select>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                {loading ? 'Creating...' : 'Signup & Mock DB Entry'}
              </button>
            </form>
          </div>

          {/* Login Form */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Existing Farmer Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  className="w-full border p-2 rounded" 
                  required 
                />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                {loading ? 'Logging in...' : 'Login & Load Context'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chat Interface */}
          <div className="bg-white p-6 rounded-lg shadow-md border flex flex-col h-[500px]">
            <h2 className="text-xl font-semibold mb-2">Farmer Chat</h2>
            <p className="text-sm text-gray-500 mb-4">Logged in as {user.name} ({user.village})</p>
            
            <div className="flex-grow overflow-y-auto mb-4 p-4 border rounded bg-gray-50">
              {response && (
                <div className="bg-blue-50 p-3 rounded-lg text-gray-800 whitespace-pre-wrap">
                  {response.answer}
                </div>
              )}
            </div>

            <form onSubmit={handleAsk} className="flex gap-2">
              <input 
                type="text" 
                value={question} 
                onChange={e => setQuestion(e.target.value)} 
                className="flex-grow border p-2 rounded" 
                placeholder="Ask about markets..."
              />
              <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                {loading ? 'Asking...' : 'Ask'}
              </button>
            </form>
          </div>

          {/* Execution Log (For Interview/Demo) */}
          <div className="bg-gray-900 text-green-400 p-6 rounded-lg shadow-md border font-mono text-sm overflow-y-auto h-[500px]">
            <h2 className="text-xl font-semibold mb-4 text-white">System Tools Execution Log</h2>
            {!response && !loading && <p className="text-gray-400">Waiting for user query...</p>}
            {loading && <p className="text-yellow-400">Executing tools...</p>}
            {response?.logs && (
              <ul className="list-disc list-inside space-y-2">
                {response.logs.map((log, idx) => (
                  <li key={idx} className="opacity-90">{log}</li>
                ))}
              </ul>
            )}
            
            {response?.data && (
              <div className="mt-6">
                <h3 className="text-white mb-2">Calculated Mandi Data:</h3>
                <pre className="text-xs text-blue-300 overflow-x-auto">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketAdvisorPrototype;
