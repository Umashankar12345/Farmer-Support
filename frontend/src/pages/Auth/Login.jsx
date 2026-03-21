// import React, { useState, useRef } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import './Login.css';

// const Login = () => {
//     const [email, setEmail] = useState('kumarkp95@gmail.com');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [isVideoPlaying, setIsVideoPlaying] = useState(true);
//     const videoRef = useRef(null);

//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setLoading(true);

//         // Simple validation
//         if (!email || !password) {
//             setError('Please enter both email and password');
//             setLoading(false);
//             return;
//         }

//         // Simulate API call
//         setTimeout(() => {
//             if (email === 'kumarkp95@gmail.com' && password === 'password') {
//                 login(email, 'Farmer User');
//                 navigate('/dashboard');
//             } else {
//                 setError('Invalid email or password');
//             }
//             setLoading(false);
//         }, 1000);
//     };

//     const toggleVideoPlay = () => {
//         if (videoRef.current) {
//             if (isVideoPlaying) {
//                 videoRef.current.pause();
//             } else {
//                 videoRef.current.play();
//             }
//             setIsVideoPlaying(!isVideoPlaying);
//         }
//     };

//     return (
//         <div className="login-container">
//             {/* Video Background */}
//             <div className="login-video-background">
//                 <video
//                     ref={videoRef}
//                     autoPlay
//                     muted
//                     loop
//                     playsInline
//                     className="login-background-video"
//                 >
//                     <source src="/videos/auth-bg.mp4" type="video/mp4" />
//                     <source src="/images/farm-bg.mp4" type="video/mp4" />
//                     {/* Fallback to online video */}
//                     <source src="https://assets.mixkit.co/videos/preview/mixkit-green-field-under-a-blue-sky-4803-large.mp4" type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>

//                 {/* Video Overlay */}
//                 <div className="login-video-overlay"></div>

//                 {/* Video Controls */}
//                 <div className="login-video-controls">
//                     <button onClick={toggleVideoPlay} className="login-video-control-btn">
//                         {isVideoPlaying ? '⏸️' : '▶️'}
//                     </button>
//                 </div>
//             </div>

//             {/* Login Card */}
//             <div className="login-card">
//                 <h1>Digital Krishi Officer</h1>
//                 <p className="login-subtitle">Sign in to your account</p>

//                 {error && <div className="error-message">{error}</div>}

//                 <form onSubmit={handleSubmit} className="login-form">
//                     <div className="input-group">
//                         <label>Email</label>
//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Enter your email"
//                             required
//                         />
//                     </div>

//                     <div className="input-group">
//                         <label>Password</label>
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Enter your password"
//                             required
//                         />
//                     </div>

//                     <button type="submit" className="login-btn" disabled={loading}>
//                         {loading ? 'Signing in...' : 'Sign In'}
//                     </button>

//                     <div className="login-footer">
//                         <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;
import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaPlay, FaPause } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('kumarkp95@gmail.com');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const videoRef = useRef(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simple validation
        if (!email || !password) {
            setError('Please enter both email and password');
            setLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            if (email === 'kumarkp95@gmail.com' && password === 'password') {
                login(email, 'Farmer User');
                navigate('/dashboard');
            } else {
                setError('Invalid email or password');
            }
            setLoading(false);
        }, 1000);
    };

    const toggleVideoPlay = () => {
        if (videoRef.current) {
            if (isVideoPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsVideoPlaying(!isVideoPlaying);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden">
            {/* Video Background */}
            <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover opacity-80"
                >
                    <source src="/videos/farmerrr-bg.mp4" type="video/mp4" />
                    {/* Fallback if video doesn't load */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600"></div>
                </video>

                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/70 to-purple-700/70"></div>

                {/* Video Controls */}
                <div className="absolute bottom-5 right-5 z-10">
                    <button
                        onClick={toggleVideoPlay}
                        className="w-10 h-10 bg-white/90 border-none rounded-full flex items-center justify-center text-indigo-600 cursor-pointer transition-transform duration-300 hover:scale-110 hover:bg-white"
                    >
                        {isVideoPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                </div>
            </div>

            {/* Login Card */}
            <div className="bg-white/95 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-[400px] z-10 relative">
                <h1 className="text-gray-800 text-center mb-2 text-3xl font-bold">Digital Krishi Officer</h1>
                <p className="text-gray-500 text-center mb-8 text-base">Sign in to your account</p>

                {error && (
                    <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-5 text-sm text-center border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-5">
                        <label className="block text-gray-800 mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full p-3 border-2 border-gray-200 rounded-xl text-base transition-colors duration-300 bg-white/90 focus:outline-none focus:border-indigo-500 focus:bg-white"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-gray-800 mb-2 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full p-3 border-2 border-gray-200 rounded-xl text-base transition-colors duration-300 bg-white/90 focus:outline-none focus:border-indigo-500 focus:bg-white"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40'}`}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className="mt-5 text-center text-gray-500 text-sm">
                        <p>Don't have an account? <Link to="/signup" className="text-indigo-500 no-underline font-medium hover:underline">Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;