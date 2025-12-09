// import React from "react";

// export default function Card({ children, className = "" }) {
//   return (
//     <div className={`rounded-2xl shadow-md p-6 bg-white ${className}`}>
//       {children}
//     </div>
//   );
// }
import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;