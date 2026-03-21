
import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaPlay, FaPause } from 'react-icons/fa';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        language: 'hi',
        farmerType: 'small',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const videoRef = useRef(null);

    const { signup } = useAuth();
    const { t, languages, changeLanguage } = useLanguage();
    const navigate = useNavigate();

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        const requiredFields = ['name', 'email', 'phone', 'password', 'confirmPassword'];
        for (const field of requiredFields) {
            if (!formData[field]?.trim()) {
                setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
                return;
            }
        }

        if (formData.password.length < 6) {
            setError(t('passwordMinLength') || 'Password must be at least 6 characters');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError(t('passwordMismatch') || 'Passwords do not match');
            return;
        }

        if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
            setError(t('invalidPhone') || 'Phone number must be 10 digits');
            return;
        }

        setLoading(true);

        try {
            // Prepare user data for signup
            const userData = {
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                phone: formData.phone.trim(),
                password: formData.password,
                language: formData.language,
                farmerType: formData.farmerType,
            };

            // Call signup function from AuthContext
            const result = signup(userData);

            if (result.success) {
                // Success - navigate to dashboard
                navigate('/dashboard', {
                    state: {
                        message: t('signupSuccess') || 'Account created successfully!'
                    }
                });
            } else {
                setError(result.message || t('signupFailed') || 'Signup failed. Please try again.');
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.message || t('signupFailed') || 'An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    const handleLanguageChange = (code) => {
        changeLanguage(code);
        setFormData(prev => ({
            ...prev,
            language: code
        }));
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
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover opacity-70"
                >
                    <source src="/videos/farm-bg.mp4" type="video/mp4" />
                    <source src="/videos/farmerrr-bg.mp4" type="video/mp4" />
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-green-field-under-a-blue-sky-4803-large.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/80 to-emerald-600/80"></div>

                {/* Video Controls */}
                <div className="absolute bottom-5 right-5 z-10">
                    <button
                        onClick={toggleVideoPlay}
                        className="w-10 h-10 bg-white/90 border-none rounded-full flex items-center justify-center text-green-600 cursor-pointer transition-transform duration-300 hover:scale-110 hover:bg-white text-lg"
                    >
                        {isVideoPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                </div>
            </div>

            <div className="z-10 w-full max-w-[500px]">
                <div className="text-center text-white mb-8">
                    <h1 className="text-4xl font-bold mb-2">Digital Krishi Officer</h1>
                    <p className="text-lg opacity-90">{t('createAccount') || 'Create your farmer account'}</p>
                </div>

                <div className="bg-white p-10 rounded-2xl shadow-2xl relative">
                    <h2 className="text-center text-gray-800 text-3xl font-bold mb-6">{t('signup') || 'Sign Up'}</h2>

                    {error && (
                        <div className="bg-gradient-to-r from-red-400 to-red-500 text-white p-3 px-4 rounded-lg mb-6 font-medium text-center shadow-sm animate-[fadeIn_0.3s_ease]">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 font-semibold text-gray-700 text-sm">
                                {t('fullName') || 'Full Name'} *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder={t('enterName') || 'Enter your full name'}
                                disabled={loading}
                                className="w-full p-3 px-4 border border-gray-300 rounded-lg text-base transition-all duration-200 bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-gray-400"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 font-semibold text-gray-700 text-sm">
                                {t('email') || 'Email Address'} *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                disabled={loading}
                                className="w-full p-3 px-4 border border-gray-300 rounded-lg text-base transition-all duration-200 bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-gray-400"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="phone" className="block mb-2 font-semibold text-gray-700 text-sm">
                                {t('phoneNumber') || 'Phone Number'} *
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="1234567890"
                                disabled={loading}
                                pattern="[0-9]{10}"
                                maxLength="10"
                                className="w-full p-3 px-4 border border-gray-300 rounded-lg text-base transition-all duration-200 bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-gray-400"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="farmerType" className="block mb-2 font-semibold text-gray-700 text-sm">
                                {t('farmerType') || 'Farmer Type'} *
                            </label>
                            <select
                                id="farmerType"
                                name="farmerType"
                                value={formData.farmerType}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className="w-full p-3 px-4 border border-gray-300 rounded-lg text-base transition-all duration-200 bg-white appearance-none focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-gray-400 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2716%27%20height=%2716%27%20fill=%27%23333%27%20viewBox=%270%200%2016%2016%27%3E%3Cpath%20d=%27M7.247%2011.14L2.451%205.658C1.885%205.013%202.345%204%203.204%204h9.592a1%201%200%201%20.753%201.659l-4.796%205.48a1%201%200%201-1.506%200z%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_1rem_center] bg-[length:16px]"
                            >
                                <option value="small">{t('smallFarmer') || 'Small Farmer'}</option>
                                <option value="medium">{t('mediumFarmer') || 'Medium Farmer'}</option>
                                <option value="large">{t('largeFarmer') || 'Large Farmer'}</option>
                                <option value="organic">{t('organicFarmer') || 'Organic Farmer'}</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="language" className="block mb-2 font-semibold text-gray-700 text-sm">
                                {t('preferredLanguage') || 'Preferred Language'} *
                            </label>
                            <select
                                id="language"
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                className="w-full p-3 px-4 border border-gray-300 rounded-lg text-base transition-all duration-200 bg-white appearance-none focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-gray-400 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2716%27%20height=%2716%27%20fill=%27%23333%27%20viewBox=%270%200%2016%2016%27%3E%3Cpath%20d=%27M7.247%2011.14L2.451%205.658C1.885%205.013%202.345%204%203.204%204h9.592a1%201%200%201%20.753%201.659l-4.796%205.48a1%201%200%201-1.506%200z%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_1rem_center] bg-[length:16px]"
                                disabled={loading}
                                required
                            >
                                {Object.entries(languages).map(([code, lang]) => (
                                    <option key={code} value={code}>
                                        {lang.flag} {lang.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 font-semibold text-gray-700 text-sm">
                                {t('password') || 'Password'} *
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                disabled={loading}
                                minLength="6"
                                className="w-full p-3 px-4 border border-gray-300 rounded-lg text-base transition-all duration-200 bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-gray-400"
                            />
                            <small className="block mt-1 text-gray-500 text-xs">
                                {t('passwordHint') || 'Must be at least 6 characters'}
                            </small>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block mb-2 font-semibold text-gray-700 text-sm">
                                {t('confirmPassword') || 'Confirm Password'} *
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder=""
                                disabled={loading}
                                className="w-full p-3 px-4 border border-gray-300 rounded-lg text-base transition-all duration-200 bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-gray-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full p-4 bg-green-500 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 mt-4 flex items-center justify-center gap-2 hover:bg-green-600 hover:-translate-y-px hover:shadow-lg hover:shadow-green-500/20 active:translate-y-0 ${loading ? 'opacity-60 cursor-not-allowed transform-none' : ''}`}
                            disabled={loading}
                        >
                            {loading ?
                                (t('creatingAccount') || 'Creating Account...') :
                                (t('signup') || 'Sign Up')
                            }
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-gray-100">
                        <p className="text-gray-600 mb-4 text-base">
                            {t('alreadyHaveAccount') || 'Already have an account?'}
                            <Link to="/login" className="text-green-500 no-underline font-semibold ml-2 transition-colors hover:underline hover:text-green-600">
                                {t('login') || 'Login'}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;