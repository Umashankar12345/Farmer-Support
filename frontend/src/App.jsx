// // // // import React, { useState } from 'react';
// // // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // // import { LanguageProvider } from './contexts/LanguageContext';
// // // // import { VoiceProvider } from './contexts/VoiceContext';
// // // // import { AuthProvider, useAuth } from './contexts/AuthContext';
// // // // import { AIProvider } from './contexts/AIContext'; // Add this import
// // // // import Sidebar from './components/Layout/Sidebar';
// // // // import Navbar from './components/Layout/Navbar';
// // // // import VoiceAssistant from './components/Voice/VoiceAssistant';
// // // // import VoiceToggleButton from './components/Voice/VoiceToggleButton';
// // // // import Login from './pages/Auth/Login';
// // // // import Signup from './pages/Auth/Signup';
// // // // import Dashboard from './pages/Dashboard/Dashboard';
// // // // import Fertilizer from './pages/Fertilizer/Fertilizer';
// // // // import MyFarm from './pages/MyFarm/MyFarm';
// // // // import FarmMechanization from './pages/FarmMechanization/FarmMechanization';
// // // // import PestDisease from './pages/PestDisease/PestDisease';
// // // // import AIChat from './pages/AIChat/AIChat';
// // // // import CropSownAnalysis from './pages/CropSownAnalysis/CropSownAnalysis';
// // // // import CropProduction from './pages/CropProduction/CropProduction';
// // // // import DroughtDashboard from './pages/DroughtDashboard/DroughtDashboard';
// // // // import CommunityForum from './pages/CommunityForum/CommunityForum';
// // // // import Settings from './pages/Settings/Settings';
// // // // import Weather from './pages/Weather/Weather';
// // // // import GovernmentSchemes from './pages/GovernmentSchemes/GovernmentSchemes';
// // // // import CropCalendar from './pages/CropCalendar/CropCalendar';
// // // // 

// // // // // Protected Route Component
// // // // const ProtectedRoute = ({ children }) => {
// // // //     const { isAuthenticated, loading } = useAuth();

// // // //     if (loading) {
// // // //         return <div className="loading-screen">Loading...</div>;
// // // //     }

// // // //     if (!isAuthenticated) {
// // // //         return <Navigate to="/login" replace />;
// // // //     }

// // // //     return children;
// // // // };

// // // // // Layout Component for Protected Routes
// // // // const DashboardLayout = ({ children, sidebarOpen, setSidebarOpen, logout }) => {
// // // //     return (
// // // //         <div className="flex">
// // // //             <Sidebar 
// // // //                 isOpen={sidebarOpen} 
// // // //                 toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
// // // //                 onLogout={logout}
// // // //             />
// // // //             <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
// // // //                 <Navbar onLogout={logout} />
// // // //                 <div className="p-6">
// // // //                     {children}
// // // //                 </div>
// // // //             </div>
// // // //             <VoiceToggleButton />
// // // //         </div>
// // // //     );
// // // // };

// // // // // AppContent component wrapped with all providers
// // // // function AppContent() {
// // // //     const { logout } = useAuth();
// // // //     const [sidebarOpen, setSidebarOpen] = useState(true);

// // // //     return (
// // // //         <Router>
// // // //             <VoiceAssistant />

// // // //             <div className="min-h-screen bg-gray-50">
// // // //                 <Routes>
// // // //                     {/* Public Routes */}
// // // //                     <Route path="/login" element={<Login />} />
// // // //                     <Route path="/signup" element={<Signup />} />

// // // //                     {/* Protected Routes with Layout */}
// // // //                     <Route path="/dashboard" element={
// // // //                         <ProtectedRoute>
// // // //                             <DashboardLayout 
// // // //                                 sidebarOpen={sidebarOpen} 
// // // //                                 setSidebarOpen={setSidebarOpen} 
// // // //                                 logout={logout}
// // // //                             >
// // // //                                 <Dashboard />
// // // //                             </DashboardLayout>
// // // //                         </ProtectedRoute>
// // // //                     } />

// // // //                     <Route path="/my-farm" element={
// // // //                         <ProtectedRoute>
// // // //                             <DashboardLayout 
// // // //                                 sidebarOpen={sidebarOpen} 
// // // //                                 setSidebarOpen={setSidebarOpen} 
// // // //                                 logout={logout}
// // // //                             >
// // // //                                 <MyFarm />
// // // //                             </DashboardLayout>
// // // //                         </ProtectedRoute>
// // // //                     } />

// // // //                     <Route path="/crop-production" element={
// // // //                         <ProtectedRoute>
// // // //                             <DashboardLayout 
// // // //                                 sidebarOpen={sidebarOpen} 
// // // //                                 setSidebarOpen={setSidebarOpen} 
// // // //                                 logout={logout}
// // // //                             >
// // // //                                 <CropProduction />
// // // //                             </DashboardLayout>
// // // //                         </ProtectedRoute>
// // // //                     } />

// // // //                     <Route path="/fertilizer" element={
// // // //                         <ProtectedRoute>
// // // //                             <DashboardLayout 
// // // //                                 sidebarOpen={sidebarOpen} 
// // // //                                 setSidebarOpen={setSidebarOpen} 
// // // //                                 logout={logout}
// // // //                             >
// // // //                                 <Fertilizer />
// // // //                             </DashboardLayout>
// // // //                         </ProtectedRoute>
// // // //                     } />

// // // //                     <Route path="/pest-disease" element={
// // // //                         <ProtectedRoute>
// // // //                             <DashboardLayout 
// // // //                                 sidebarOpen={sidebarOpen} 
// // // //                                 setSidebarOpen={setSidebarOpen} 
// // // //                                 logout={logout}
// // // //                             >
// // // //                                 <PestDisease />
// // // //                             </DashboardLayout>
// // // //                         </ProtectedRoute>
// // // //                     } />

// // // //                     <Route path="/weather" element={
// // // //                         <ProtectedRoute>
// // // //                             <DashboardLayout 
// // // //                                 sidebarOpen={sidebarOpen} 
// // // //                                 setSidebarOpen={setSidebarOpen} 
// // // //                                 logout={logout}
// // // //                             >
// // // //                                 <Weather />
// // // //                             </DashboardLayout>
// // // //                         </ProtectedRoute>
// // // //                     } />

// // // //                     <Route path="/crop-calendar" element={
// // // //                         <ProtectedRoute>
// // // //                             <DashboardLayout 
// // // //                                 sidebarOpen={sidebarOpen} 
// // // //                                 setSidebarOpen={setSidebarOpen} 
// // // //                                 logout={logout}
// // // //                             >
// // // //                                 <CropCalendar />
// // // //                             </DashboardLayout>
// // // //                         </ProtectedRoute>
// // // //                     } />

// // // //                     <Route path="/ai-chat" element={
// // // //                         <ProtectedRoute>
// // // //                             <DashboardLayout 
// // // //                                 sidebarOpen={sidebarOpen} 
// // // //                                 setSidebarOpen={setSidebarOpen} 
// // // //                                 logout={logout}
// // // //                             >
// // // //                                 <AIChat />
// // // //                             </DashboardLayout>
// // // //                         </ProtectedRoute>
// // // //                     } />

// // // //                     <Route path="/farm-mechanization" element={
// // // //                         <ProtectedRoute>
// // // //                             <DashboardLayout 
// // // //                                 sidebarOpen={sidebarOpen} 
// // // //                                 setSidebarOpen={setSidebarOpen} 
// // // //                                 logout={logout}
// // // //                             >
// // // //                                 <FarmMechanization />
// // // //                             </DashboardLayout>
// // // //                         </ProtectedRoute>
// // // //                     } />

// // // //                     <Route path="/government-schemes" element={
// // // //                         <ProtectedRoute>
// // // //                             <DashboardLayout 
// // // //                                 sidebarOpen={sidebarOpen} 
// // // //                                 setSidebarOpen={setSidebarOpen} 
// // // //                                 logout={logout}
// // // //                             >
// // // //                                 <GovernmentSchemes />
// // // //                             </DashboardLayout>
// // // //                         </ProtectedRoute>
// // // //                     } />

// // // //                     <Route path="/community-forum" element={
// // // //                         <ProtectedRoute>
// // // //                             <DashboardLayout 
// // // //                                 sidebarOpen={sidebarOpen} 
// // // //                                 setSidebarOpen={setSidebarOpen} 
// // // //                                 logout={logout}
// // // //                             >
// // // //                                 <CommunityForum />
// // // //                             </DashboardLayout>
// // // //                         </ProtectedRoute>
// // // //                     } />

// // // //                     <Route path="/settings" element={
// // // //                         <ProtectedRoute>
// // // //                             <DashboardLayout 
// // // //                                 sidebarOpen={sidebarOpen} 
// // // //                                 setSidebarOpen={setSidebarOpen} 
// // // //                                 logout={logout}
// // // //                             >
// // // //                                 <Settings />
// // // //                             </DashboardLayout>
// // // //                         </ProtectedRoute>
// // // //                     } />

// // // //                     {/* Default redirect */}
// // // //                     <Route path="/" element={<Navigate to="/dashboard" replace />} />
// // // //                     <Route path="*" element={<Navigate to="/dashboard" replace />} />
// // // //                 </Routes>
// // // //             </div>
// // // //         </Router>
// // // //     );
// // // // }

// // // // function App() {
// // // //     return (
// // // //         <AuthProvider>
// // // //             <LanguageProvider>
// // // //                 <VoiceProvider>
// // // //                     <AIProvider> {/* Add AIProvider here */}
// // // //                         <AppContent />
// // // //                     </AIProvider>
// // // //                 </VoiceProvider>
// // // //             </LanguageProvider>
// // // //         </AuthProvider>
// // // //     );
// // // // }

// // // // export default App;

// // // import React, { useState } from 'react';
// // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // import { LanguageProvider } from './contexts/LanguageContext';
// // // import { VoiceProvider } from './contexts/VoiceContext';
// // // import { AuthProvider, useAuth } from './contexts/AuthContext';
// // // import Sidebar from './components/Layout/Sidebar';
// // // import VoiceAssistant from './components/Voice/VoiceAssistant';
// // // import VoiceToggleButton from './components/Voice/VoiceToggleButton';
// // // import Login from './pages/Auth/Login';
// // // import Signup from './pages/Auth/Signup';
// // // import Dashboard from './pages/Dashboard/Dashboard';
// // // import Fertilizer from './pages/Fertilizer/Fertilizer';
// // // import MyFarm from './pages/MyFarm/MyFarm';
// // // import FarmMechanization from './pages/FarmMechanization/FarmMechanization';
// // // import PestDisease from './pages/PestDisease/PestDisease';
// // // import AIChat from './pages/AIChat/AIChat';
// // // import CropSownAnalysis from './pages/CropSownAnalysis/CropSownAnalysis';
// // // import CropProduction from './pages/CropProduction/CropProduction';
// // // import DroughtDashboard from './pages/DroughtDashboard/DroughtDashboard';
// // // import CommunityForum from './pages/CommunityForum/CommunityForum';
// // // import Settings from './pages/Settings/Settings';
// // // import Weather from './pages/Weather/Weather';
// // // import GovernmentSchemes from './pages/GovernmentSchemes/GovernmentSchemes';
// // // import CropCalendar from './pages/CropCalendar/CropCalendar';


// // // // Protected Route Component
// // // const ProtectedRoute = ({ children }) => {
// // //     const { isAuthenticated, loading } = useAuth();

// // //     if (loading) {
// // //         return <div className="loading-screen">Loading...</div>;
// // //     }

// // //     if (!isAuthenticated) {
// // //         return <Navigate to="/login" replace />;
// // //     }

// // //     return children;
// // // };

// // // // SIMPLIFIED Layout Component - Remove Navbar here
// // // const DashboardLayout = ({ children, sidebarOpen, setSidebarOpen, logout }) => {
// // //     return (
// // //         <div className="flex min-h-screen">
// // //             <Sidebar 
// // //                 isOpen={sidebarOpen} 
// // //                 toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
// // //                 onLogout={logout}
// // //             />
// // //             <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
// // //                 <div className="p-0"> {/* Remove padding here */}
// // //                     {children}
// // //                 </div>
// // //             </div>
// // //             <VoiceToggleButton />
// // //         </div>
// // //     );
// // // };

// // // function AppContent() {
// // //     const { logout } = useAuth();
// // //     const [sidebarOpen, setSidebarOpen] = useState(true);

// // //     return (
// // //         <Router>
// // //             <VoiceAssistant />

// // //             <div className="min-h-screen bg-gray-50">
// // //                 <Routes>
// // //                     {/* Public Routes */}
// // //                     <Route path="/login" element={<Login />} />
// // //                     <Route path="/signup" element={<Signup />} />

// // //                     {/* Protected Routes with Layout - Dashboard needs its own header */}
// // //                     <Route path="/dashboard" element={
// // //                         <ProtectedRoute>
// // //                             <div className="flex min-h-screen">
// // //                                 <Sidebar 
// // //                                     isOpen={sidebarOpen} 
// // //                                     toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
// // //                                     onLogout={logout}
// // //                                 />
// // //                                 <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
// // //                                     <Dashboard />
// // //                                 </div>
// // //                                 <VoiceToggleButton />
// // //                             </div>
// // //                         </ProtectedRoute>
// // //                     } />

// // //                     {/* Other pages use the DashboardLayout */}
// // //                     <Route path="/my-farm" element={
// // //                         <ProtectedRoute>
// // //                             <DashboardLayout 
// // //                                 sidebarOpen={sidebarOpen} 
// // //                                 setSidebarOpen={setSidebarOpen} 
// // //                                 logout={logout}
// // //                             >
// // //                                 <MyFarm />
// // //                             </DashboardLayout>
// // //                         </ProtectedRoute>
// // //                     } />

// // //                     <Route path="/crop-production" element={
// // //                         <ProtectedRoute>
// // //                             <DashboardLayout 
// // //                                 sidebarOpen={sidebarOpen} 
// // //                                 setSidebarOpen={setSidebarOpen} 
// // //                                 logout={logout}
// // //                             >
// // //                                 <CropProduction />
// // //                             </DashboardLayout>
// // //                         </ProtectedRoute>
// // //                     } />

// // //                     {/* Add other routes similarly... */}

// // //                     {/* Default redirect */}
// // //                     <Route path="/" element={<Navigate to="/dashboard" replace />} />
// // //                 </Routes>
// // //             </div>
// // //         </Router>
// // //     );
// // // }

// // // function App() {
// // //     return (
// // //         <AuthProvider>
// // //             <LanguageProvider>
// // //                 <VoiceProvider>
// // //                     <AppContent />
// // //                 </VoiceProvider>
// // //             </LanguageProvider>
// // //         </AuthProvider>
// // //     );
// // // }

// // // export default App;












// // import React, { useState } from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { LanguageProvider } from './contexts/LanguageContext';
// // import { VoiceProvider } from './contexts/VoiceContext';
// // import { AuthProvider, useAuth } from './contexts/AuthContext';
// // import Sidebar from './components/Layout/Sidebar';
// // import VoiceAssistant from './components/Voice/VoiceAssistant';
// // import VoiceToggleButton from './components/Voice/VoiceToggleButton';
// // import Login from './pages/Auth/Login';
// // import Signup from './pages/Auth/Signup';
// // import Dashboard from './pages/Dashboard/Dashboard';
// // import Fertilizer from './pages/Fertilizer/Fertilizer';
// // import MyFarm from './pages/MyFarm/MyFarm';
// // import FarmMechanization from './pages/FarmMechanization/FarmMechanization';
// // import PestDisease from './pages/PestDisease/PestDisease';
// // import AIChat from './pages/AIChat/AIChat';
// // import CropSownAnalysis from './pages/CropSownAnalysis/CropSownAnalysis';
// // import CropProduction from './pages/CropProduction/CropProduction';
// // import DroughtDashboard from './pages/DroughtDashboard/DroughtDashboard';
// // import CommunityForum from './pages/CommunityForum/CommunityForum';
// // import Settings from './pages/Settings/Settings';
// // import Weather from './pages/Weather/Weather';
// // import GovernmentSchemes from './pages/GovernmentSchemes/GovernmentSchemes';
// // import CropCalendar from './pages/CropCalendar/CropCalendar';


// // // Protected Route Component
// // const ProtectedRoute = ({ children }) => {
// //     const { isAuthenticated, loading } = useAuth();

// //     if (loading) {
// //         return <div className="loading-screen">Loading...</div>;
// //     }

// //     if (!isAuthenticated) {
// //         return <Navigate to="/login" replace />;
// //     }

// //     return children;
// // };

// // // Layout Component for Protected Routes
// // const DashboardLayout = ({ children, sidebarOpen, setSidebarOpen, logout }) => {
// //     return (
// //         <div className="flex min-h-screen">
// //             <Sidebar 
// //                 isOpen={sidebarOpen} 
// //                 toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
// //                 onLogout={logout}
// //             />
// //             <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
// //                 <div className="p-0">
// //                     {children}
// //                 </div>
// //             </div>
// //             <VoiceToggleButton />
// //         </div>
// //     );
// // };

// // function AppContent() {
// //     const { logout } = useAuth();
// //     const [sidebarOpen, setSidebarOpen] = useState(true);

// //     return (
// //         <Router>
// //             <VoiceAssistant />

// //             <div className="min-h-screen bg-gray-50">
// //                 <Routes>
// //                     {/* Public Routes */}
// //                     <Route path="/login" element={<Login />} />
// //                     <Route path="/signup" element={<Signup />} />

// //                     {/* Protected Routes with Layout */}
// //                     <Route path="/dashboard" element={
// //                         <ProtectedRoute>
// //                             <div className="flex min-h-screen">
// //                                 <Sidebar 
// //                                     isOpen={sidebarOpen} 
// //                                     toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
// //                                     onLogout={logout}
// //                                 />
// //                                 <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
// //                                     <Dashboard />
// //                                 </div>
// //                                 <VoiceToggleButton />
// //                             </div>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/my-farm" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <MyFarm />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/crop-production" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <CropProduction />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     {/* FIXED: Add fertilizer route */}
// //                     <Route path="/fertilizer" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <Fertilizer />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     {/* ALSO ADD: If you have fertilizer-recommendations route */}
// //                     <Route path="/fertilizer-recommendations" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <Fertilizer />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/pest-disease" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <PestDisease />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/weather" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <Weather />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/crop-calendar" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <CropCalendar />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/ai-chat" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <AIChat />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/farm-mechanization" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <FarmMechanization />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/government-schemes" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <GovernmentSchemes />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/community-forum" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <CommunityForum />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/settings" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <Settings />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     {/* Add other routes that are in your Sidebar/Navbar */}
// //                     <Route path="/crop-sown-analysis" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <CropSownAnalysis />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/drought-dashboard" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <DroughtDashboard />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     {/* Default redirect */}
// //                     <Route path="/" element={<Navigate to="/dashboard" replace />} />

// //                     {/* Catch-all route for 404 - Should be LAST */}
// //                     <Route path="*" element={<Navigate to="/dashboard" replace />} />
// //                 </Routes>
// //             </div>
// //         </Router>
// //     );
// // }

// // function App() {
// //     return (
// //         <AuthProvider>
// //             <LanguageProvider>
// //                 <VoiceProvider>
// //                     <AppContent />
// //                 </VoiceProvider>
// //             </LanguageProvider>
// //         </AuthProvider>
// //     );
// // }

// // export default App;




// // import React, { useState } from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { LanguageProvider } from './contexts/LanguageContext';
// // import { VoiceProvider } from './contexts/VoiceContext';
// // import { AuthProvider, useAuth } from './contexts/AuthContext';
// // import Sidebar from './components/Layout/Sidebar';
// // import VoiceAssistant from './components/Voice/VoiceAssistant';
// // import VoiceToggleButton from './components/Voice/VoiceToggleButton';
// // import Login from './pages/Auth/Login';
// // import Signup from './pages/Auth/Signup';
// // import Dashboard from './pages/Dashboard/Dashboard';
// // import Fertilizer from './pages/Fertilizer/Fertilizer';
// // import MyFarm from './pages/MyFarm/MyFarm';
// // import FarmMechanization from './pages/FarmMechanization/FarmMechanization';
// // import PestDisease from './pages/PestDisease/PestDisease';
// // import AIChat from './pages/AIChat/AIChat';
// // import CropSownAnalysis from './pages/CropSownAnalysis/CropSownAnalysis';
// // import CropProduction from './pages/CropProduction/CropProduction';
// // import DroughtDashboard from './pages/DroughtDashboard/DroughtDashboard';
// // import CommunityForum from './pages/CommunityForum/CommunityForum';
// // import Settings from './pages/Settings/Settings';
// // import Weather from './pages/Weather/Weather';
// // import GovernmentSchemes from './pages/GovernmentSchemes/GovernmentSchemes';
// // import CropCalendar from './pages/CropCalendar/CropCalendar';


// // // Protected Route Component
// // const ProtectedRoute = ({ children }) => {
// //     const { isAuthenticated, loading } = useAuth();

// //     if (loading) {
// //         return <div className="loading-screen">Loading...</div>;
// //     }

// //     if (!isAuthenticated) {
// //         return <Navigate to="/login" replace />;
// //     }

// //     return children;
// // };

// // // Layout Component for Protected Routes
// // const DashboardLayout = ({ children, sidebarOpen, setSidebarOpen, logout }) => {
// //     return (
// //         <div className="flex min-h-screen">
// //             <Sidebar 
// //                 isOpen={sidebarOpen} 
// //                 toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
// //                 onLogout={logout}
// //             />
// //             <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
// //                 <div className="p-0">
// //                     {children}
// //                 </div>
// //             </div>
// //             <VoiceToggleButton />
// //         </div>
// //     );
// // };

// // function AppContent() {
// //     const { logout } = useAuth();
// //     const [sidebarOpen, setSidebarOpen] = useState(true);

// //     return (
// //         <Router>
// //             <VoiceAssistant />

// //             <div className="min-h-screen bg-gray-50">
// //                 <Routes>
// //                     {/* Public Routes */}
// //                     <Route path="/login" element={<Login />} />
// //                     <Route path="/signup" element={<Signup />} />

// //                     {/* Protected Routes with Layout */}
// //                     <Route path="/dashboard" element={
// //                         <ProtectedRoute>
// //                             <div className="flex min-h-screen">
// //                                 <Sidebar 
// //                                     isOpen={sidebarOpen} 
// //                                     toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
// //                                     onLogout={logout}
// //                                 />
// //                                 <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
// //                                     <Dashboard />
// //                                 </div>
// //                                 <VoiceToggleButton />
// //                             </div>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/my-farm" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <MyFarm />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/crop-production" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <CropProduction />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     {/* FIXED: Add fertilizer route */}
// //                     <Route path="/fertilizer" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <Fertilizer />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     {/* ALSO ADD: If you have fertilizer-recommendations route */}
// //                     <Route path="/fertilizer-recommendations" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <Fertilizer />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/pest-disease" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <PestDisease />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/weather" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <Weather />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/crop-calendar" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <CropCalendar />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/ai-chat" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <AIChat />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/farm-mechanization" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <FarmMechanization />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/government-schemes" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <GovernmentSchemes />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/community-forum" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <CommunityForum />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/settings" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <Settings />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     {/* Add other routes that are in your Sidebar/Navbar */}
// //                     <Route path="/crop-sown-analysis" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <CropSownAnalysis />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     <Route path="/drought-dashboard" element={
// //                         <ProtectedRoute>
// //                             <DashboardLayout 
// //                                 sidebarOpen={sidebarOpen} 
// //                                 setSidebarOpen={setSidebarOpen} 
// //                                 logout={logout}
// //                             >
// //                                 <DroughtDashboard />
// //                             </DashboardLayout>
// //                         </ProtectedRoute>
// //                     } />

// //                     {/* Default redirect */}
// //                     <Route path="/" element={<Navigate to="/dashboard" replace />} />

// //                     {/* Catch-all route for 404 - Should be LAST */}
// //                     <Route path="*" element={<Navigate to="/dashboard" replace />} />
// //                 </Routes>
// //             </div>
// //         </Router>
// //     );
// // }

// // function App() {
// //     return (
// //         <AuthProvider>
// //             <LanguageProvider>
// //                 <VoiceProvider>
// //                     <AppContent />
// //                 </VoiceProvider>
// //             </LanguageProvider>
// //         </AuthProvider>
// //     );
// // }

// // export default App;

// // App.jsx - CORRECT VERSION with Login/Logout Integration
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { LanguageProvider } from './contexts/LanguageContext';
// import { VoiceProvider } from './contexts/VoiceContext';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import Sidebar from './components/Layout/Sidebar';
// import VoiceAssistant from './components/Voice/VoiceAssistant';
// import VoiceToggleButton from './components/Voice/VoiceToggleButton';
// import Login from './pages/Auth/Login';
// import Signup from './pages/Auth/Signup';
// import Dashboard from './pages/Dashboard/Dashboard';
// import Fertilizer from './pages/Fertilizer/Fertilizer';
// import MyFarm from './pages/MyFarm/MyFarm';
// import FarmMechanization from './pages/FarmMechanization/FarmMechanization';
// import PestDisease from './pages/PestDisease/PestDisease';
// import AIChat from './pages/AIChat/AIChat';
// import CropSownAnalysis from './pages/CropSownAnalysis/CropSownAnalysis';
// import CropProduction from './pages/CropProduction/CropProduction';
// import DroughtDashboard from './pages/DroughtDashboard/DroughtDashboard';
// import CommunityForum from './pages/CommunityForum/CommunityForum';
// import Settings from './pages/Settings/Settings';
// import Weather from './pages/Weather/Weather';
// import GovernmentSchemes from './pages/GovernmentSchemes/GovernmentSchemes';
// import CropCalendar from './pages/CropCalendar/CropCalendar';
// import ProtectedRoute from './components/Auth/ProtectedRoute';
// import './App.css';

// // Protected Route Component
// const ProtectedRoute = ({ children }) => {
//     const { isAuthenticated, loading } = useAuth();

//     if (loading) {
//         return <div className="loading-screen">Loading...</div>;
//     }

//     if (!isAuthenticated) {
//         return <Navigate to="/login" replace />;
//     }

//     return children;
// };

// // Layout Component for Protected Routes
// const DashboardLayout = ({ children, sidebarOpen, setSidebarOpen, logout }) => {
//     return (
//         <div className="flex min-h-screen">
//             <Sidebar 
//                 isOpen={sidebarOpen} 
//                 toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
//                 onLogout={logout}
//             />
//             <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
//                 <div className="p-0">
//                     {children}
//                 </div>
//             </div>
//             <VoiceToggleButton />
//         </div>
//     );
// };

// function AppContent() {
//     const { logout } = useAuth();
//     const [sidebarOpen, setSidebarOpen] = useState(true);

//     return (
//         <Router>
//             <VoiceAssistant />

//             <div className="min-h-screen bg-gray-50">
//                 <Routes>
//                     {/* Public Routes - NO SIDEBAR */}
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/signup" element={<Signup />} />

//                     {/* Protected Routes - WITH SIDEBAR LAYOUT */}
//                     <Route path="/dashboard" element={
//                         <ProtectedRoute>
//                             <div className="flex min-h-screen">
//                                 <Sidebar 
//                                     isOpen={sidebarOpen} 
//                                     toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
//                                     onLogout={logout}
//                                 />
//                                 <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
//                                     <Dashboard />
//                                 </div>
//                                 <VoiceToggleButton />
//                             </div>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/my-farm" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen} 
//                                 logout={logout}
//                             >
//                                 <MyFarm />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/crop-production" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen} 
//                                 logout={logout}
//                             >
//                                 <CropProduction />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/fertilizer" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen} 
//                                 logout={logout}
//                             >
//                                 <Fertilizer />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/fertilizer-recommendations" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen} 
//                                 logout={logout}
//                             >
//                                 <Fertilizer />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/pest-disease" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen} 
//                                 logout={logout}
//                             >
//                                 <PestDisease />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/weather" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen} 
//                                 logout={logout}
//                             >
//                                 <Weather />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/crop-calendar" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen} 
//                                 logout={logout}
//                             >
//                                 <CropCalendar />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/ai-chat" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen} 
//                                 logout={logout}
//                             >
//                                 <AIChat />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/farm-mechanization" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen} 
//                                 logout={logout}
//                             >
//                                 <FarmMechanization />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/government-schemes" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen} 
//                                 logout={logout}
//                             >
//                                 <GovernmentSchemes />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/community-forum" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen} 
//                                 logout={logout}
//                             >
//                                 <CommunityForum />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/settings" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen} 
//                                 logout={logout}
//                             >
//                                 <Settings />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/crop-sown-analysis" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen} 
//                                 logout={logout}
//                             >
//                                 <CropSownAnalysis />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/drought-dashboard" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen} 
//                                 logout={logout}
//                             >
//                                 <DroughtDashboard />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     {/* Voice Assistant Page */}
//                     <Route path="/voice-assistant" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen} 
//                                 logout={logout}
//                             >
//                                 {/* You'll need to create this component */}
//                                 <div className="p-6">
//                                     <h1 className="text-2xl font-bold mb-4">Voice Assistant</h1>
//                                     <p>Voice assistant page content here...</p>
//                                 </div>
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     {/* Default redirect */}
//                     <Route path="/" element={<Navigate to="/dashboard" replace />} />

//                     {/* Catch-all route for 404 */}
//                     <Route path="*" element={<Navigate to="/dashboard" replace />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// function App() {
//     return (
//         <AuthProvider>
//             <LanguageProvider>
//                 <VoiceProvider>
//                     <AppContent />
//                 </VoiceProvider>
//             </LanguageProvider>
//         </AuthProvider>
//     );
// }

// export default App;

// App.jsx - UPDATED VERSION
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { LanguageProvider } from './contexts/LanguageContext';
// import { VoiceProvider } from './contexts/VoiceContext';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import Sidebar from './components/Layout/Sidebar';
// import VoiceAssistant from './components/Voice/VoiceAssistant';
// import VoiceToggleButton from './components/Voice/VoiceToggleButton';
// import Login from './pages/Auth/Login';
// import Signup from './pages/Auth/Signup';
// import Dashboard from './pages/Dashboard/Dashboard';
// import Fertilizer from './pages/Fertilizer/Fertilizer';
// import MyFarm from './pages/MyFarm/MyFarm';
// import FarmMechanization from './pages/FarmMechanization/FarmMechanization';
// import PestDisease from './pages/PestDisease/PestDisease';
// import AIChat from './pages/AIChat/AIChat';
// import CropSownAnalysis from './pages/CropSownAnalysis/CropSownAnalysis';
// import CropProduction from './pages/CropProduction/CropProduction';
// import DroughtDashboard from './pages/DroughtDashboard/DroughtDashboard';
// import CommunityForum from './pages/CommunityForum/CommunityForum';
// import Settings from './pages/Settings/Settings';
// import Weather from './pages/Weather/Weather';
// import GovernmentSchemes from './pages/GovernmentSchemes/GovernmentSchemes';
// import CropCalendar from './pages/CropCalendar/CropCalendar';
// import ProtectedRoute from './components/Auth/ProtectedRoute';
// import './App.css';

// // Layout Component for Protected Routes
// const DashboardLayout = ({ children, sidebarOpen, setSidebarOpen }) => {
//     const { logout } = useAuth();

//     return (
//         <div className="flex min-h-screen">
//             <Sidebar 
//                 isOpen={sidebarOpen} 
//                 toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
//                 onLogout={logout}
//             />
//             <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
//                 <div className="p-0">
//                     {children}
//                 </div>
//             </div>
//             <VoiceToggleButton />
//         </div>
//     );
// };

// function AppContent() {
//     const [sidebarOpen, setSidebarOpen] = useState(true);

//     return (
//         <Router>
//             <VoiceAssistant />

//             <div className="min-h-screen bg-gray-50">
//                 <Routes>
//                     {/* Public Routes - NO SIDEBAR */}
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/signup" element={<Signup />} />

//                     {/* Protected Routes - WITH SIDEBAR LAYOUT */}
//                     <Route path="/dashboard" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen}
//                             >
//                                 <Dashboard />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/my-farm" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen}
//                             >
//                                 <MyFarm />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     {/* Add all other protected routes here */}
//                     <Route path="/fertilizer-recommendations" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen}
//                             >
//                                 <Fertilizer />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/weather-forecast" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen}
//                             >
//                                 <Weather />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/pest-disease" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen}
//                             >
//                                 <PestDisease />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/government-schemes" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen}
//                             >
//                                 <GovernmentSchemes />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/crop-calendar" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen}
//                             >
//                                 <CropCalendar />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/crop-sown-analysis" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen}
//                             >
//                                 <CropSownAnalysis />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/farm-mechanization" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen}
//                             >
//                                 <FarmMechanization />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/drought-alert" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen}
//                             >
//                                 <DroughtDashboard />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/crop-production" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen}
//                             >
//                                 <CropProduction />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/ai-chat" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen}
//                             >
//                                 <AIChat />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/community-forum" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen}
//                             >
//                                 <CommunityForum />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     <Route path="/settings" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen}
//                             >
//                                 <Settings />
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     {/* Voice Assistant Page */}
//                     <Route path="/voice-assistant" element={
//                         <ProtectedRoute>
//                             <DashboardLayout 
//                                 sidebarOpen={sidebarOpen} 
//                                 setSidebarOpen={setSidebarOpen}
//                             >
//                                 <div className="p-6">
//                                     <h1 className="text-2xl font-bold mb-4">Voice Assistant</h1>
//                                     <p>Voice assistant page content here...</p>
//                                 </div>
//                             </DashboardLayout>
//                         </ProtectedRoute>
//                     } />

//                     {/* Default redirect */}
//                     <Route path="/" element={<Navigate to="/dashboard" replace />} />

//                     {/* Catch-all route for 404 */}
//                     <Route path="*" element={<Navigate to="/dashboard" replace />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// function App() {
//     return (
//         <AuthProvider>
//             <LanguageProvider>
//                 <VoiceProvider>
//                     <AppContent />
//                 </VoiceProvider>
//             </LanguageProvider>
//         </AuthProvider>
//     );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { VoiceProvider } from './contexts/VoiceContext';
import { AuthProvider } from './contexts/AuthContext';
import Sidebar from './components/Layout/Sidebar';
import AgriVoiceChat from './components/AI/AgriVoiceChat';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Import all your pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import MyFarm from './pages/MyFarm/MyFarm';
import Fertilizer from './pages/Fertilizer/Fertilizer';
import Weather from './pages/Weather/Weather';
import PestDisease from './pages/PestDisease/PestDisease';
import CropCalendar from './pages/CropCalendar/CropCalendar';
import FarmMechanization from './pages/FarmMechanization/FarmMechanization';
import GovernmentSchemes from './pages/GovernmentSchemes/GovernmentSchemes';
import CommunityForum from './pages/CommunityForum/CommunityForum';
import Settings from './pages/Settings/Settings';
import CropSownAnalysis from './pages/CropSownAnalysis/CropSownAnalysis';
import DroughtDashboard from './pages/DroughtDashboard/DroughtDashboard';
import AIChat from './pages/AIChat/AIChat';
import CropProduction from './pages/CropProduction/CropProduction';

import './App.css';

// Layout component for protected routes
const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen">
            <Sidebar
                isOpen={sidebarOpen}
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
                <main className="p-6">
                    {children}
                </main>
            </div>
            <AgriVoiceChat />
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <LanguageProvider>
                <VoiceProvider>
                    <Router>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />

                            {/* Protected Routes */}
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <DashboardLayout>
                                        <Dashboard />
                                    </DashboardLayout>
                                </ProtectedRoute>
                            } />

                            <Route path="/my-farm" element={
                                <ProtectedRoute>
                                    <DashboardLayout>
                                        <MyFarm />
                                    </DashboardLayout>
                                </ProtectedRoute>
                            } />

                            <Route path="/fertilizer" element={
                                <ProtectedRoute>
                                    <DashboardLayout>
                                        <Fertilizer />
                                    </DashboardLayout>
                                </ProtectedRoute>
                            } />

                            <Route path="/weather" element={
                                <ProtectedRoute>
                                    <DashboardLayout>
                                        <Weather />
                                    </DashboardLayout>
                                </ProtectedRoute>
                            } />

                            <Route path="/pest-disease" element={
                                <ProtectedRoute>
                                    <DashboardLayout>
                                        <PestDisease />
                                    </DashboardLayout>
                                </ProtectedRoute>
                            } />

                            <Route path="/crop-calendar" element={
                                <ProtectedRoute>
                                    <DashboardLayout>
                                        <CropCalendar />
                                    </DashboardLayout>
                                </ProtectedRoute>
                            } />

                            <Route path="/farm-mechanization" element={
                                <ProtectedRoute>
                                    <DashboardLayout>
                                        <FarmMechanization />
                                    </DashboardLayout>
                                </ProtectedRoute>
                            } />

                            <Route path="/government-schemes" element={
                                <ProtectedRoute>
                                    <DashboardLayout>
                                        <GovernmentSchemes />
                                    </DashboardLayout>
                                </ProtectedRoute>
                            } />

                            <Route path="/community-forum" element={
                                <ProtectedRoute>
                                    <DashboardLayout>
                                        <CommunityForum />
                                    </DashboardLayout>
                                </ProtectedRoute>
                            } />

                            <Route path="/settings" element={
                                <ProtectedRoute>
                                    <DashboardLayout>
                                        <Settings />
                                    </DashboardLayout>
                                </ProtectedRoute>
                            } />

                            <Route path="/crop-sown-analysis" element={
                                <ProtectedRoute>
                                    <DashboardLayout>
                                        <CropSownAnalysis />
                                    </DashboardLayout>
                                </ProtectedRoute>
                            } />

                            <Route path="/drought-dashboard" element={
                                <ProtectedRoute>
                                    <DashboardLayout>
                                        <DroughtDashboard />
                                    </DashboardLayout>
                                </ProtectedRoute>
                            } />

                            <Route path="/ai-chat" element={
                                <ProtectedRoute>
                                    <DashboardLayout>
                                        <AIChat />
                                    </DashboardLayout>
                                </ProtectedRoute>
                            } />

                            <Route path="/crop-production" element={
                                <ProtectedRoute>
                                    <DashboardLayout>
                                        <CropProduction />
                                    </DashboardLayout>
                                </ProtectedRoute>
                            } />

                            {/* Default route */}
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />

                            {/* Catch-all route */}
                            <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                    </Router>
                </VoiceProvider>
            </LanguageProvider>
        </AuthProvider>
    );
}

export default App;