import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash, FaTimes, FaCopy, FaThumbsUp, FaThumbsDown, FaPaperPlane, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useVoice } from '../../contexts/VoiceContext';
import { useLanguage } from '../../contexts/LanguageContext';

// ─── Voice Waveform Animation ───────────────────────────────────
const WaveformBars = ({ active }) => (
    <div className="flex items-center justify-center gap-[3px] h-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((bar) => (
            <motion.div
                key={bar}
                className="w-[3px] rounded-full bg-gradient-to-t from-emerald-400 to-teal-300"
                animate={
                    active
                        ? {
                            height: [4, 12 + Math.random() * 20, 6, 16 + Math.random() * 16, 4],
                        }
                        : { height: 4 }
                }
                transition={
                    active
                        ? {
                            duration: 0.6 + Math.random() * 0.4,
                            repeat: Infinity,
                            repeatType: 'loop',
                            ease: 'easeInOut',
                            delay: bar * 0.06,
                        }
                        : { duration: 0.3 }
                }
            />
        ))}
    </div>
);

// ─── Suggested Questions ────────────────────────────────────────
const SUGGESTED_QUESTIONS = [
    { emoji: '🌾', text: 'Best fertilizer for wheat?' },
    { emoji: '🌧️', text: 'Will it rain tomorrow?' },
    { emoji: '🍃', text: 'How to treat leaf curl disease?' },
    { emoji: '🐛', text: 'How to control pest naturally?' },
    { emoji: '💧', text: 'Best irrigation method?' },
    { emoji: '🌱', text: 'When to sow rice seeds?' },
];

// ─── Main Component ─────────────────────────────────────────────
const AgriVoiceChat = () => {
    const {
        isListening,
        isSpeaking,
        transcript,
        aiResponse,
        currentLanguage,
        startListening,
        stopListening,
        handleQuerySubmit,
        handleSpeakResponse
    } = useVoice();

    const { languages, currentLanguage: uiLanguage } = useLanguage();

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 'welcome',
            text: "Namaste! 🙏 I'm AgriVoice, your AI farming assistant. Ask me anything about crops, weather, fertilizers, pests, or farming techniques!",
            sender: 'ai',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedId, setCopiedId] = useState(null);
    const [feedbackGiven, setFeedbackGiven] = useState({});
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Sync global AI response to chat messages
    useEffect(() => {
        if (aiResponse && aiResponse !== messages[messages.length - 1]?.text) {
            if (aiResponse.includes('Processing') || aiResponse.includes('प्रोसेस')) return;

            const aiMsg = {
                id: `ai-${Date.now()}`,
                text: aiResponse,
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMsg]);
            setIsLoading(false);
        }
    }, [aiResponse]);

    // Sync transcript to input field when listening
    useEffect(() => {
        if (isListening && transcript) {
            setInput(transcript);
        }
    }, [transcript, isListening]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Listen for external open event (from Dashboard AgriVoice button)
    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-agrivoicechat', handleOpen);
        return () => window.removeEventListener('open-agrivoicechat', handleOpen);
    }, []);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // ─── Send Message ───────────────────────────────────────
    const sendMessage = useCallback(async (text) => {
        if (!text.trim() || isLoading) return;

        const userMsg = {
            id: `user-${Date.now()}`,
            text: text.trim(),
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            await handleQuerySubmit(text.trim(), false);
        } catch (error) {
            console.error('AgriVoiceChat error:', error);
            setIsLoading(false);
        }
    }, [isLoading, handleQuerySubmit]);

    // ─── Voice Input (Using VoiceContext) ───────────────────
    const toggleVoice = useCallback(() => {
        if (isListening) {
            stopListening();
            if (input.trim()) {
                sendMessage(input);
            }
        } else {
            startListening();
        }
    }, [isListening, startListening, stopListening, input, sendMessage]);

    // ─── Copy to Clipboard ──────────────────────────────────
    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // ─── Handle Feedback ────────────────────────────────────
    const handleFeedback = (messageId, type) => {
        setFeedbackGiven((prev) => ({ ...prev, [messageId]: type }));
    };

    // ─── Handle Key Press ───────────────────────────────────
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    // ─── Clear Chat ─────────────────────────────────────────
    const clearChat = () => {
        setMessages([
            {
                id: 'welcome',
                text: "Namaste! 🙏 I'm AgriVoiceChat, your AI farming assistant. Ask me anything about crops, weather, fertilizers, pests, or farming techniques!",
                sender: 'ai',
                timestamp: new Date(),
            },
        ]);
        setFeedbackGiven({});
    };

    const showSuggestions = messages.length <= 2;

    return (
        <>
            {/* ─── Floating Action Button ────────────────────── */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[9990] w-16 h-16 rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                style={{
                    background: 'linear-gradient(135deg, #10b981, #059669, #047857)',
                    boxShadow: isOpen
                        ? '0 0 0 3px rgba(16,185,129,0.3)'
                        : '0 0 30px rgba(16,185,129,0.5), 0 0 60px rgba(16,185,129,0.2)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={
                    !isOpen
                        ? {
                            boxShadow: [
                                '0 0 20px rgba(16,185,129,0.4), 0 0 40px rgba(16,185,129,0.1)',
                                '0 0 40px rgba(16,185,129,0.6), 0 0 80px rgba(16,185,129,0.3)',
                                '0 0 20px rgba(16,185,129,0.4), 0 0 40px rgba(16,185,129,0.1)',
                            ],
                        }
                        : {}
                }
                transition={
                    !isOpen
                        ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                        : { duration: 0.2 }
                }
            >
                {isOpen ? (
                    <FaTimes className="text-white text-xl" />
                ) : (
                    <div className="relative">
                        <FaMicrophone className="text-white text-2xl" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-emerald-600 animate-pulse" />
                    </div>
                )}
            </motion.button>

            {/* ─── Chat Modal ────────────────────────────────── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed bottom-28 right-6 z-[9995] w-[420px] max-h-[680px] flex flex-col rounded-3xl overflow-hidden"
                        style={{
                            background: 'rgba(15, 23, 42, 0.85)',
                            backdropFilter: 'blur(24px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            boxShadow: '0 32px 64px rgba(0,0,0,0.4), 0 0 80px rgba(16,185,129,0.08)',
                        }}
                    >
                        {/* Decorative orbs */}
                        <div className="absolute -top-16 -right-16 w-32 h-32 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

                        {/* ─── Header ──────────────────────────── */}
                        <div className="relative px-5 py-4 border-b border-white/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                        <span className="text-lg">🌾</span>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-base tracking-tight">
                                            AgriVoiceChat
                                        </h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                            <span className="text-emerald-400 text-xs font-medium">
                                                AI Active • {languages[currentLanguage]?.name || 'Hindi'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={clearChat}
                                        className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all"
                                        title="Clear chat"
                                    >
                                        🗑️
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ─── Messages Area ───────────────────── */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[400px] scroll-smooth"
                            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
                        >
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.sender === 'user'
                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-br-sm'
                                            : 'bg-white/10 text-white/90 rounded-bl-sm backdrop-blur-sm border border-white/5'
                                            }`}
                                    >
                                        {/* Sender label + time */}
                                        <div className="flex items-center gap-2 mb-1">
                                            {msg.sender === 'ai' && <span className="text-sm">🤖</span>}
                                            <span className="text-[11px] font-semibold opacity-70">
                                                {msg.sender === 'user' ? 'You' : 'AgriVoiceChat'}
                                            </span>
                                            <span className="text-[10px] opacity-50">
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>

                                        {/* Message text */}
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                                        {/* AI message actions */}
                                        {msg.sender === 'ai' && msg.id !== 'welcome' && (
                                            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                                                <button
                                                    onClick={() => handleSpeakResponse(msg.text)}
                                                    className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${isSpeaking ? 'bg-emerald-500/20 text-emerald-400' : 'text-white/40 hover:text-white/80'}`}
                                                    title="Speak response"
                                                >
                                                    {isSpeaking ? <FaVolumeUp className="text-[10px]" /> : <FaVolumeMute className="text-[10px]" />}
                                                    <span className="text-[10px]">{isSpeaking ? 'Speaking...' : 'Listen'}</span>
                                                </button>
                                                <button
                                                    onClick={() => copyToClipboard(msg.text, msg.id)}
                                                    className="flex items-center gap-1 text-[10px] text-white/40 hover:text-white/80 transition-colors ml-auto"
                                                    title="Copy response"
                                                >
                                                    <FaCopy className="text-[10px]" />
                                                    {copiedId === msg.id ? 'Copied!' : 'Copy'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Loading indicator */}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3 backdrop-blur-sm border border-white/5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">🤖</span>
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                            <span className="text-xs text-white/40 ml-1">Thinking...</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* ─── Suggested Questions ─────────────── */}
                        {showSuggestions && (
                            <div className="px-4 pb-2">
                                <p className="text-[11px] text-white/30 font-medium mb-2 uppercase tracking-wider">
                                    Suggested Questions
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {SUGGESTED_QUESTIONS.map((q, i) => (
                                        <motion.button
                                            key={i}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => sendMessage(q.text)}
                                            disabled={isLoading}
                                            className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/8 hover:bg-white/15 text-white/70 hover:text-white border border-white/8 hover:border-emerald-500/30 transition-all disabled:opacity-50"
                                        >
                                            <span className="mr-1">{q.emoji}</span>
                                            {q.text}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ─── Voice Waveform (when listening) ── */}
                        {isListening && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="px-4 py-3 border-t border-white/10 flex items-center justify-center gap-3"
                            >
                                <div className="relative">
                                    <span className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping" />
                                    <FaMicrophone className="text-emerald-400 text-sm relative z-10" />
                                </div>
                                <WaveformBars active={true} />
                                <span className="text-xs text-emerald-400 font-medium animate-pulse">
                                    Listening...
                                </span>
                            </motion.div>
                        )}

                        {/* ─── Input Area ──────────────────────── */}
                        <div className="px-4 py-3 border-t border-white/10">
                            <div className="flex items-center gap-2">
                                {/* Mic Button */}
                                <motion.button
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.92 }}
                                    onClick={toggleVoice}
                                    className={`p-3 rounded-xl transition-all flex-shrink-0 ${isListening
                                        ? 'bg-red-500 shadow-lg shadow-red-500/30 ring-2 ring-red-500/20'
                                        : 'bg-white/10 hover:bg-white/15 text-white/60 hover:text-white'
                                        }`}
                                    title={isListening ? 'Stop listening' : 'Voice input'}
                                >
                                    {isListening ? (
                                        <FaMicrophoneSlash className="text-white text-sm" />
                                    ) : (
                                        <FaMicrophone className="text-sm" />
                                    )}
                                </motion.button>

                                {/* Text Input */}
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Ask about crops, weather, pests..."
                                    disabled={isLoading || isListening}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/8 border border-white/10 text-white text-sm placeholder-white/30 outline-none focus:border-emerald-500/40 focus:bg-white/12 transition-all disabled:opacity-50"
                                />

                                {/* Send Button */}
                                <motion.button
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.92 }}
                                    onClick={() => sendMessage(input)}
                                    disabled={!input.trim() || isLoading}
                                    className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 transition-all"
                                >
                                    <FaPaperPlane className="text-sm" />
                                </motion.button>
                            </div>

                            {/* Footer */}
                            <p className="text-center text-[10px] text-white/20 mt-2">
                                Powered by Gemini AI • AgriVoiceChat
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AgriVoiceChat;
