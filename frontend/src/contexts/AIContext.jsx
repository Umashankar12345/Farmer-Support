// src/contexts/AIContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

// Create context
const AIContext = createContext({});

// Custom hook to use AI context
export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

// AI Provider Component - FIXED: Export it properly
export const AIProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [escalationStatus, setEscalationStatus] = useState(null);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  const sendMessage = useCallback(async (message) => {
    setIsLoading(true);
    
    // Add user message to chat
    const userMessage = { 
      id: Date.now(), 
      role: 'user', 
      content: message, 
      timestamp: new Date() 
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    
    try {
      // Simulate AI response (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock AI response
      const aiResponse = {
        id: Date.now() + 1,
        role: 'ai',
        content: `I received your message: "${message}". This is a mock response. In a real app, this would come from an AI model.`,
        timestamp: new Date(),
        confidence: 0.85,
        sources: ['Agricultural knowledge base', 'Local farming data']
      };
      
      setChatHistory(prev => [...prev, aiResponse]);
      
      return aiResponse;
    } catch (error) {
      console.error('Error sending message to AI:', error);
      
      const errorMessage = { 
        id: Date.now() + 1,
        role: 'error', 
        content: 'Sorry, I encountered an error. Please try again.', 
        timestamp: new Date() 
      };
      
      setChatHistory(prev => [...prev, errorMessage]);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setChatHistory([]);
    setEscalationStatus(null);
  }, []);

  const requestHumanEscalation = useCallback(async (query, reason) => {
    try {
      setIsLoading(true);
      // Mock escalation request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const response = {
        ticketId: `TICKET-${Date.now()}`,
        estimatedWaitTime: '5-10 minutes',
        message: 'Your request has been escalated to a human expert.'
      };
      
      setEscalationStatus({
        type: 'human_requested',
        reason: reason,
        originalQuery: query,
        ...response
      });
      
      return response;
    } catch (error) {
      console.error('Error requesting human escalation:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelEscalation = useCallback(() => {
    setEscalationStatus(null);
  }, []);

  const toggleVoice = useCallback(() => {
    setIsVoiceEnabled(prev => !prev);
  }, []);

  const value = {
    chatHistory,
    isLoading,
    escalationStatus,
    isVoiceEnabled,
    sendMessage,
    clearChat,
    requestHumanEscalation,
    cancelEscalation,
    toggleVoice,
    hasActiveEscalation: escalationStatus !== null
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};

// Default export
export default AIContext;