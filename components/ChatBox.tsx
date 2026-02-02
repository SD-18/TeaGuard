
import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { GoogleGenAI } from "@google/genai";

interface ChatBoxProps {
  currentLanguage: Language;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ currentLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: currentLanguage === 'as' ? "নমস্কাৰ! মই আপোনাক কেনেকৈ সহায় কৰিব পাৰোঁ?" : "Hello! I am your AI tea plantation expert. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      // Use process.env.API_KEY directly as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = "gemini-3-flash-preview";
      
      const prompt = `
        You are a helpful AI assistant for tea growers in Assam.
        Current Language: ${currentLanguage === 'as' ? 'Assamese' : 'English'}.
        Keep your answer helpful, concise, and related to tea farming.
        User asks: ${userMessage}
      `;

      const response = await ai.models.generateContent({ model, contents: prompt });
      // Use .text property directly
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm not sure about that. Let me look it up." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I am having trouble connecting. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[350px] sm:w-[400px] h-[500px] rounded-[2rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden mb-6 animate-fadeIn">
          {/* Header */}
          <div className="bg-emerald-900 p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-sm">
                <i className="fas fa-robot"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm">TeaGuard Assistant</h4>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Expert Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-emerald-400/50 hover:text-white transition-colors">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none shadow-md' : 'bg-white text-slate-800 rounded-tl-none shadow-sm border border-slate-100'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100 flex items-center space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
            />
            <button 
              onClick={handleSend}
              className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <i className="fas fa-paper-plane text-sm"></i>
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-emerald-500 hover:scale-110 transition-all group relative active:scale-95"
      >
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-bold">1</div>
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'} text-2xl`}></i>
      </button>
    </div>
  );
};
