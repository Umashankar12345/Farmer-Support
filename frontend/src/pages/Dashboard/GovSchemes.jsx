import Card from '../../components/Layout/Card'

const GovSchemes = () => {
  const schemes = [
    { 
      name: 'PM-KISAN Scheme', 
      description: 'Income support of ₹6,000 per year in three equal installments', 
      eligibility: 'All farmer families',
      deadline: '31 Dec 2024'
    },
    { 
      name: 'PMFBY', 
      description: 'Crop insurance with premium as low as 1.5% for Kharif crops', 
      eligibility: 'All farmers including sharecroppers',
      deadline: 'Ongoing'
    },
    { 
      name: 'Neem Coated Urea', 
      description: '35% subsidy on urea with neem coating for better efficiency', 
      eligibility: 'Farmers with landholding',
      deadline: '31 Mar 2024'
    },
  ]

  return (
    <Card title="Relevant Government Schemes">
      <div className="space-y-4">
        {schemes.map((scheme, index) => (
          <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <h4 className="font-semibold text-lg mb-2">{scheme.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{scheme.description}</p>
            <div className="flex justify-between items-center">
              <div className="text-sm">
                <span className="text-gray-500">Eligibility: </span>
                <span className="font-medium">{scheme.eligibility}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Apply by: </span>
                <span className="font-medium">{scheme.deadline}</span>
              </div>
            </div>
            <button className="w-full mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              Apply Now
            </button>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 px-4 py-2 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
        View All Schemes
      </button>
    </Card>
  )
}

export default GovSchemes