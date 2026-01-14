import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { CHATBOT_API } from '@/config/api';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isStreaming?: boolean;
  error?: boolean;
}

const WITTY_MESSAGES = [
  "Consulting the digital oracle...",
  "Thinking harder than usual...",
  "Brewing some AI magic...",
  "Searching through the knowledge vault...",
  "Connecting the dots...",
  "Processing at light speed... well, almost!",
  "Channeling my inner genius...",
  "Crafting the perfect response...",
  "Diving deep into the data ocean...",
  "Summoning the wisdom of the internet..."
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Show witty messages after 3 seconds of loading
  useEffect(() => {
    if (isLoading) {
      setLoadingStartTime(Date.now());
      const timeout = setTimeout(() => {
        const randomMessage = WITTY_MESSAGES[Math.floor(Math.random() * WITTY_MESSAGES.length)];
        setLoadingMessage(randomMessage);
      }, 3000);
      return () => clearTimeout(timeout);
    } else {
      setLoadingMessage('');
      setLoadingStartTime(null);
    }
  }, [isLoading]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: "Hey there! I'm the AI version of PR. Ask me anything about my background, skills, projects, or experiences!",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  // Streaming text effect
  const streamText = (text: string, messageId: string) => {
    let currentIndex = 0;
    const words = text.split(' ');
    
    const streamNextWord = () => {
      if (currentIndex < words.length) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, text: words.slice(0, currentIndex + 1).join(' '), isStreaming: true }
              : msg
          )
        );
        currentIndex++;
        streamingTimeoutRef.current = setTimeout(streamNextWord, 50);
      } else {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, isStreaming: false }
              : msg
          )
        );
      }
    };
    
    streamNextWord();
  };

  const sendMessage = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(CHATBOT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.status === 429) {
        setIsRateLimited(true);
        const rateLimitMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "You've reached the message limit. Please try again later.",
          sender: 'bot',
          timestamp: new Date(),
          error: true
        };
        setMessages(prev => [...prev, rateLimitMessage]);
      } else if (response.ok) {
        const data = await response.json();
        
        // Check for error in response
        if (data.error) {
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: `Error: ${data.error}`,
            sender: 'bot',
            timestamp: new Date(),
            error: true
          };
          setMessages(prev => [...prev, errorMessage]);
        } else {
          const botMessageId = (Date.now() + 1).toString();
          const botMessage: Message = {
            id: botMessageId,
            text: '',
            sender: 'bot',
            timestamp: new Date(),
            isStreaming: true
          };
          setMessages(prev => [...prev, botMessage]);
          
          // Stream the response word by word
          streamText(data.answer, botMessageId);
        }
        setIsRateLimited(false);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && inputText.length <= 500 && !isLoading && !isRateLimited) {
      sendMessage(inputText.trim());
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsExpanded(false);
    if (streamingTimeoutRef.current) {
      clearTimeout(streamingTimeoutRef.current);
    }
  };

  const openChat = () => {
    setIsOpen(true);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Animate chat icon on mount
  useEffect(() => {
    const icon = document.getElementById('chat-icon');
    if (icon) {
      setTimeout(() => {
        icon.style.animation = 'bounce 0.5s ease-in-out';
      }, 1000);
    }
  }, []);

  return (
    <>
      {/* Chat Icon */}
      {!isOpen && (
        <button
          onClick={openChat}
          id="chat-icon"
          className="fixed bottom-5 right-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.766l5.52-3.766H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM20 16h-4.52l-2.48 1.699-.48-.345V16H4V4h16v12z"/>
          </svg>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
      )}

      {/* Backdrop Blur Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={closeChat}
          style={{
            animation: 'fadeIn 0.3s ease-out'
          }}
        />
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed z-50 flex flex-col bg-black/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl transition-all duration-300 ease-in-out ${
            isExpanded 
              ? 'inset-4 md:inset-8 lg:inset-16' 
              : 'inset-2 sm:bottom-5 sm:right-5 sm:w-[28rem] sm:h-[600px] sm:inset-auto md:bottom-5 md:right-5'
          }`}
          style={{
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          {/* Animated background orb */}
          <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          </div>

          {/* Header */}
          <div className="relative flex justify-between items-center p-4 border-b border-gray-700 bg-black/50">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              AI PR
            </h3>
            <div className="flex items-center gap-2">
              {/* Expand button - hidden on mobile */}
              <button
                onClick={toggleExpanded}
                className="hidden sm:block text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded"
                title={isExpanded ? "Restore size" : "Expand"}
              >
                {isExpanded ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>
              <button
                onClick={closeChat}
                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={messagesRef} className="relative flex-1 overflow-y-auto p-4 space-y-6">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] ${
                    message.sender === 'user' ? 'ml-auto' : 'mr-auto'
                  }`}
                >
                  {/* Message bubble */}
                  <div
                    className={`p-4 rounded-2xl shadow-lg ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-br-md'
                        : message.error
                        ? 'bg-red-900/30 border border-red-500/50 text-red-200 rounded-bl-md'
                        : 'bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-gray-100 rounded-bl-md'
                    }`}
                  >
                    <div className="text-sm leading-relaxed prose prose-invert max-w-none">
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                    {message.isStreaming && (
                      <span className="inline-block w-1 h-4 bg-current ml-1 animate-pulse"></span>
                    )}
                  </div>
                  
                  {/* Timestamp */}
                  <div className={`flex items-center gap-1 mt-1 px-2 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator with witty message */}
            {isLoading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="max-w-[75%]">
                  <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-gray-200 p-4 rounded-2xl rounded-bl-md">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      {loadingMessage && (
                        <span className="text-xs text-gray-400 ml-2 animate-pulse">{loadingMessage}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="relative p-4 border-t border-gray-700 bg-black/50">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me about PR's portfolio..."
                className="flex-1 bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                maxLength={500}
                disabled={isLoading || isRateLimited}
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading || isRateLimited}
                className={`px-5 py-3 rounded-xl transition-all ${
                  !inputText.trim() || isLoading || isRateLimited
                    ? 'bg-gray-700 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/50'
                } text-white`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 21l21-9L2 3v7l15 2-15 2z"/>
                  </svg>
                )}
              </button>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>{inputText.length}/500</span>
              {isRateLimited && <span className="text-red-400">Rate limited - try again later</span>}
            </div>
          </form>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bounce {
            0%, 20%, 60%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            80% {
              transform: translateY(-5px);
            }
          }
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `
      }} />
    </>
  );
};

export default Chatbot;
