// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // Test components - create these first
// const Signup = () => <div>Signup Page</div>;
// const Login = () => <div>Login Page</div>;
// const Dashboard = () => <div>Dashboard Page</div>;

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   return token ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/signup" />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         } />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import Dashboard from './Dashboard';

function App() {
  return <Dashboard />;
}

export default App;