import Card from '../../components/Layout/Card'

const PestAdvisory = () => {
  const alerts = [
    { crop: 'Paddy', pest: 'Brown Plant Hopper', severity: 'High', recommendation: 'Use Imidacloprid 17.8% SL' },
    { crop: 'Cotton', pest: 'Bollworm', severity: 'Medium', recommendation: 'Spray Chlorantraniliprole 18.5% SC' },
    { crop: 'Tomato', pest: 'Leaf Miner', severity: 'Low', recommendation: 'Apply Neem Oil Spray' },
  ]

  return (
    <Card title="Pest & Disease Advisory">
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className={`p-4 rounded-lg border-l-4 ${
            alert.severity === 'High' ? 'border-red-500 bg-red-50' :
            alert.severity === 'Medium' ? 'border-yellow-500 bg-yellow-50' :
            'border-green-500 bg-green-50'
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{alert.crop}: {alert.pest}</h4>
                <p className="text-sm text-gray-600 mt-1">{alert.recommendation}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                alert.severity === 'High' ? 'bg-red-100 text-red-800' :
                alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {alert.severity} Risk
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
        View All Advisories
      </button>
    </Card>
  )
}

export default PestAdvisory