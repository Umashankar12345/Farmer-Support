import React from 'react';
import SchemeCard from './SchemeCard';

const SchemeMiniWidget = ({ pmfbyData = {} }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* PM-KISAN - Standard for all */}
      <SchemeCard
        title="PM-KISAN Samman Nidhi"
        amount="₹6,000 / year"
        subText="Next installment: ₹2,000 in 18 days"
        progress={66}
        progressLabel="2 of 3 installments received"
        bgColor="#14301f"
        accentColor="#5ee08a"
        url="pmkisan.gov.in"
      />

      {/* PMFBY - State specific */}
      <SchemeCard
        title="PMFBY Crop Insurance"
        amount={pmfbyData.pa || '₹1.5% Premium'}
        subText={pmfbyData.ps || 'Kharif 2024 — active'}
        progress={pmfbyData.pp || 0}
        progressLabel={pmfbyData.pl || 'pmfby.gov.in'}
        bgColor="#0d2b4a"
        accentColor="#60aff5"
        url="pmfby.gov.in"
      />
    </div>
  );
};

export default SchemeMiniWidget;

//Project Title: AI-Based Agriculture Assistance System (Backend)

// Project Description:
// I developed a backend system that helps farmers get intelligent recommendations related to crops, fertilizers, and disease detection. The system processes user queries and uses AI-based models and external APIs to generate useful agricultural insights.

// Key Features:

// RESTful APIs for handling farmer queries and responses
// Integration with AI/ML models for crop and disease recommendations
// Input-based suggestions for fertilizers and crop selection
// Real-time data processing and response generation
// Secure user data handling and request validation

// Tech Stack:

// Backend: Node.js, Express.js
// Database: MongoDB
// AI Integration: ML model / external AI APIs
// API Testing: Postman

// My Role:

// Designed and developed backend APIs for handling user queries
// Integrated AI services and processed prediction results
// Structured database for storing user inputs and outputs
// Implemented validation, error handling, and optimized responses

// Outcome:

// Built a scalable backend system for real-world agricultural use
// Improved decision - making support for farmers using AI insights