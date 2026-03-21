// // src/contexts/AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within AuthProvider');
//     }
//     return context;
// };

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem('authToken');
//         const savedUser = localStorage.getItem('user');
        
//         if (token && savedUser) {
//             try {
//                 const parsedUser = JSON.parse(savedUser);
//                 setUser(parsedUser);
//             } catch (err) {
//                 console.error('Error parsing user data:', err);
//                 localStorage.removeItem('authToken');
//                 localStorage.removeItem('user');
//             }
//         }
//         setLoading(false);
//     }, []);

//     const login = async (email, password) => {
//         try {
//             setError(null);
            
//             if (!email || !password) {
//                 throw new Error('Email and password are required');
//             }

//             // In a real app, this would be an API call
//             // Mock authentication for demo purposes
//             const mockUser = {
//                 id: '1',
//                 name: 'Farmer User',
//                 email: email,
//                 role: 'farmer',
//                 language: 'hi',
//                 farm: {
//                     name: 'Green Valley Farm',
//                     size: '10 acres',
//                     location: 'Punjab'
//                 }
//             };
            
//             const mockToken = 'mock-jwt-token-' + Date.now();
            
//             // Store authentication data
//             localStorage.setItem('authToken', mockToken);
//             localStorage.setItem('user', JSON.stringify(mockUser));
//             localStorage.setItem('userName', mockUser.name);
//             localStorage.setItem('userEmail', mockUser.email);
            
//             setUser(mockUser);
            
//             // Simulate API delay
//             await new Promise(resolve => setTimeout(resolve, 500));
            
//             return { success: true, user: mockUser };
//         } catch (error) {
//             setError(error.message);
//             return { success: false, error: error.message };
//         }
//     };

//     const signup = async (userData) => {
//         try {
//             setError(null);
            
//             const mockUser = {
//                 id: Date.now().toString(),
//                 name: userData.name,
//                 email: userData.email,
//                 role: 'farmer',
//                 language: 'hi',
//                 farm: {
//                     name: userData.farmName || 'My Farm',
//                     size: userData.farmSize || '5 acres',
//                     location: userData.location || 'Unknown'
//                 }
//             };
            
//             const mockToken = 'mock-jwt-token-' + Date.now();
            
//             // Store authentication data
//             localStorage.setItem('authToken', mockToken);
//             localStorage.setItem('user', JSON.stringify(mockUser));
//             localStorage.setItem('userName', mockUser.name);
//             localStorage.setItem('userEmail', mockUser.email);
            
//             setUser(mockUser);
            
//             // Simulate API delay
//             await new Promise(resolve => setTimeout(resolve, 500));
            
//             return { success: true, user: mockUser };
//         } catch (error) {
//             setError(error.message);
//             return { success: false, error: error.message };
//         }
//     };

//     const logout = () => {
//         // Remove all authentication-related items
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('user');
//         localStorage.removeItem('userName');
//         localStorage.removeItem('userEmail');
        
//         setUser(null);
//         setError(null);
//     };

//     const updateUser = (updatedUser) => {
//         setUser(updatedUser);
//         localStorage.setItem('user', JSON.stringify(updatedUser));
//         // Also update individual fields if needed
//         if (updatedUser.name) {
//             localStorage.setItem('userName', updatedUser.name);
//         }
//         if (updatedUser.email) {
//             localStorage.setItem('userEmail', updatedUser.email);
//         }
//     };

//     const value = {
//         user,
//         isAuthenticated: !!user,
//         loading,
//         error,
//         login,
//         signup,
//         logout,
//         updateUser
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContext;

// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         // Check for existing session on app load
//         const token = localStorage.getItem('authToken');
//         const userName = localStorage.getItem('userName');
//         const userEmail = localStorage.getItem('userEmail');
        
//         if (token && userName) {
//             setUser({ 
//                 name: userName, 
//                 email: userEmail 
//             });
//             setIsAuthenticated(true);
//         }
//         setLoading(false);
//     }, []);

//     const login = (email, name) => {
//         // Simulate API login
//         const token = 'dummy-token-' + Date.now();
        
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userName', name);
//         localStorage.setItem('userEmail', email);
        
//         setUser({ name, email });
//         setIsAuthenticated(true);
        
//         return { success: true, token };
//     };

//     const logout = () => {
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('userName');
//         localStorage.removeItem('userEmail');
        
//         setUser(null);
//         setIsAuthenticated(false);
        
//         return { success: true };
//     };

//     return (
//         <AuthContext.Provider value={{
//             user,
//             isAuthenticated,
//             loading,
//             login,
//             logout
//         }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check for existing session on app load
        const token = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('user');
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        
        if (token) {
            // Try to get user from saved user object first
            if (savedUser) {
                try {
                    const parsedUser = JSON.parse(savedUser);
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                } catch (err) {
                    console.error('Error parsing user data:', err);
                    // Fallback to individual fields
                    if (userName) {
                        setUser({ 
                            name: userName, 
                            email: userEmail || ''
                        });
                        setIsAuthenticated(true);
                    }
                }
            } else if (userName) {
                // Fallback for older format
                setUser({ 
                    name: userName, 
                    email: userEmail || ''
                });
                setIsAuthenticated(true);
            }
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login - in real app, call your API
        const token = 'dummy-token-' + Date.now();
        
        // Create user object with more data
        const userData = {
            id: Date.now().toString(),
            name: 'Farmer User',
            email: email,
            role: 'farmer',
            language: 'hi',
            farm: {
                name: 'Green Valley Farm',
                size: '5.2 Ha',
                location: 'Punjab'
            }
        };
        
        // Save all data
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('userEmail', userData.email);
        
        setUser(userData);
        setIsAuthenticated(true);
        
        return { 
            success: true, 
            token,
            user: userData 
        };
    };

    const signup = (userData) => {
        // Mock signup - in real app, call your API
        console.log('Signup called with:', userData);
        
        const token = 'dummy-token-' + Date.now();
        
        // Create user object from signup data
        const newUser = {
            id: Date.now().toString(),
            name: userData.name || 'Farmer User',
            email: userData.email,
            role: 'farmer',
            language: userData.language || 'hi',
            farm: {
                name: userData.farmName || 'My Farm',
                size: userData.farmSize || '5 acres',
                location: userData.location || 'Unknown'
            }
        };
        
        // Save all data
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('userName', newUser.name);
        localStorage.setItem('userEmail', newUser.email);
        
        setUser(newUser);
        setIsAuthenticated(true);
        
        return { 
            success: true, 
            token,
            user: newUser,
            message: 'Registration successful! Welcome to Digital Krishi Officer.'
        };
    };

    const logout = () => {
        // Clear all authentication data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        
        setUser(null);
        setIsAuthenticated(false);
        
        return { success: true };
    };

    const updateUser = (updatedData) => {
        // Update user data
        const updatedUser = {
            ...user,
            ...updatedData,
            farm: {
                ...user?.farm,
                ...updatedData.farm
            }
        };
        
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Also update individual fields if needed
        if (updatedData.name) {
            localStorage.setItem('userName', updatedData.name);
        }
        if (updatedData.email) {
            localStorage.setItem('userEmail', updatedData.email);
        }
        
        return { success: true, user: updatedUser };
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loading,
            login,
            signup,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;