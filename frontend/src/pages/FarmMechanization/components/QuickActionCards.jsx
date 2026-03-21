import React from 'react'

const QuickActionCards = ({ onActionClick }) => {
  const actions = [
    {
      id: 'find',
      icon: '🚜',
      title: 'Find Machinery',
      description: 'Search based on crop, farm size & operation',
      color: 'bg-blue-500'
    },
    {
      id: 'rent',
      icon: '🏭',
      title: 'Rent Machinery',
      description: 'Find nearby rental centers',
      color: 'bg-green-500'
    },
    {
      id: 'schedule',
      icon: '📅',
      title: 'Schedule Service',
      description: 'Book maintenance & services',
      color: 'bg-purple-500'
    },
    {
      id: 'subsidy',
      icon: '💰',
      title: 'Subsidy Info',
      description: 'Government mechanization schemes',
      color: 'bg-yellow-500'
    },
    {
      id: 'ai',
      icon: '🤖',
      title: 'AI Suggestion',
      description: 'Get machine recommendations',
      color: 'bg-pink-500'
    }
  ]

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {actions.map(action => (
          <button
            key={action.id}
            onClick={() => onActionClick(action.id)}
            className={`${action.color} text-white p-4 rounded-xl hover:opacity-90 transition-opacity flex flex-col items-center text-center`}
          >
            <span className="text-3xl mb-2">{action.icon}</span>
            <h4 className="font-bold mb-1">{action.title}</h4>
            <p className="text-sm opacity-90">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActionCards