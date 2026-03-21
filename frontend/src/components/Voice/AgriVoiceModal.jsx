import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash, FaTimes, FaVolumeUp } from 'react-icons/fa';
import { useVoice } from '../../contexts/VoiceContext';

const WaveformBars = ({ active }) => (
    <div className="flex items-end justify-center gap-1 h-16">
        {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
            <motion.div
                key={bar}
                className="w-1.5 rounded-full bg-gradient-to-t from-emerald-500 to-teal-300"
                animate={
                    active
                        ? {
                            height: [8, 24 + Math.random() * 40, 12, 32 + Math.random() * 32, 8],
                        }
                        : { height: 8 }
                }
                transition={
                    active
                        ? {
                            duration: 0.8 + Math.random() * 0.5,
                            repeat: Infinity,
                            repeatType: 'loop',
                            ease: 'easeInOut',
                            delay: bar * 0.08,
                        }
                        : { duration: 0.3 }
                }
            />
        ))}
    </div>
);

const AgriVoiceModal = ({ isOpen, onClose }) => {
    const {
        isListening,
        isSpeaking,
        transcript,
        aiResponse,
        startListening,
        stopListening,
        handleQuerySubmit,
        setTranscript,
        setAiResponse,
    } = useVoice();

    const [inputText, setInputText] = useState('');

    const handleMicToggle = () => {
        if (isListening) {
            stopListening();
        } else {
            setAiResponse('');
            startListening();
        }
    };

    const handleSend = () => {
        const text = inputText.trim() || transcript.trim();
        if (text) {
            handleQuerySubmit(text, false);
            setInputText('');
            setTranscript('');
        }
    };

    const handleClose = () => {
        if (isListening) stopListening();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
                    onClick={handleClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md bg-white/20 dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 dark:border-slate-600/30 overflow-hidden"
                    >
                        {/* Decorative gradient orbs */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl" />

                        {/* Header */}
                        <div className="relative flex items-center justify-between px-6 pt-6 pb-2">
                            <div>
                                <h2 className="text-xl font-bold text-white dark:text-white drop-shadow-lg">
                                    🌾 AgriVoice Assistant
                                </h2>
                                <p className="text-sm text-white/60 dark:text-gray-400 mt-0.5">
                                    Powered by Gemini AI
                                </p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Waveform Area */}
                        <div className="px-6 py-6 flex flex-col items-center">
                            <WaveformBars active={isListening} />

                            <p className="mt-4 text-sm font-medium text-white/70">
                                {isListening
                                    ? '🎤 Listening... Speak now'
                                    : isSpeaking
                                        ? '🔊 Speaking response...'
                                        : 'Tap the mic to start'}
                            </p>

                            {/* Mic Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleMicToggle}
                                className={`mt-5 p-5 rounded-full shadow-xl transition-all ${isListening
                                        ? 'bg-red-500 shadow-red-500/30 ring-4 ring-red-500/20'
                                        : 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-emerald-500/30 hover:shadow-emerald-500/50'
                                    }`}
                            >
                                {isListening ? (
                                    <FaMicrophoneSlash className="text-white text-2xl" />
                                ) : (
                                    <FaMicrophone className="text-white text-2xl" />
                                )}
                            </motion.button>
                        </div>

                        {/* Transcript */}
                        {transcript && (
                            <div className="mx-6 mb-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                                <p className="text-xs font-semibold text-emerald-300 mb-1">You said:</p>
                                <p className="text-sm text-white/90">{transcript}</p>
                            </div>
                        )}

                        {/* AI Response */}
                        {aiResponse && (
                            <div className="mx-6 mb-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                                <p className="text-xs font-semibold text-purple-300 mb-1 flex items-center gap-1">
                                    <FaVolumeUp className="text-[10px]" /> AI Response:
                                </p>
                                <p className="text-sm text-white/90 leading-relaxed">{aiResponse}</p>
                            </div>
                        )}

                        {/* Text Input */}
                        <div className="px-6 pb-6">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Or type your question..."
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm outline-none focus:border-emerald-400/50 transition-all backdrop-blur-sm"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSend}
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20"
                                >
                                    Ask
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AgriVoiceModal;
