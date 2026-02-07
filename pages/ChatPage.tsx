
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  MoreVertical, 
  Search, 
  User,
  Sparkles,
  Bot
} from 'lucide-react';
import { MOCK_CONVERSATIONS, MOCK_USER } from '../constants';
import { GoogleGenAI } from "@google/genai";
import { useApp } from '../AppContext';

const ChatPage: React.FC = () => {
  const { theme } = useApp();
  const [activeConvo, setActiveConvo] = useState(MOCK_CONVERSATIONS[0]);
  const [messages, setMessages] = useState([
    { id: 'm1', text: 'Hello Kofi! How is your WASSCE prep going?', sender: 'Dr. John Appiah', isMe: false, time: '10:30 AM' },
    { id: 'm2', text: 'It is going well, sir. I am struggling a bit with sets though.', sender: 'Kofi Mensah', isMe: true, time: '10:45 AM' },
    { id: 'm3', text: 'Don\'t worry! I just posted a new video lesson on that. Check it out!', sender: 'Dr. John Appiah', isMe: false, time: '10:46 AM' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isAiMode, setIsAiMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: `${MOCK_USER.firstName} ${MOCK_USER.lastName}`,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    if (isAiMode) {
      setIsTyping(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: inputText,
          config: {
            systemInstruction: "You are 'Easy Learn AI Tutor', a friendly academic assistant for West African high school students. Help them with WASSCE topics in a clear, encouraging way. Use Ghanaian context when relevant.",
          }
        });

        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: response.text || "I'm sorry, I couldn't process that. Try asking in a different way!",
          sender: 'Easy Learn AI',
          isMe: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden animate-fade-in-up">
      {/* Sidebar */}
      <div className="w-full md:w-80 border-r border-slate-100 dark:border-slate-800 flex flex-col bg-white dark:bg-slate-900">
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Messages</h2>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-600 dark:text-white"
            />
          </div>
          
          <button 
            onClick={() => setIsAiMode(true)}
            className={`w-full p-4 rounded-2xl border flex items-center gap-3 transition-all mb-6 ${isAiMode ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-lg shadow-blue-50 dark:shadow-none' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <div className="w-10 h-10 blue-gradient rounded-xl flex items-center justify-center text-white shrink-0">
              <Sparkles size={20} />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-900 dark:text-white">AI Study Tutor</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">Always Active</p>
            </div>
          </button>

          <div className="space-y-2 overflow-y-auto flex-1">
            {MOCK_CONVERSATIONS.map(convo => (
              <button 
                key={convo.id}
                onClick={() => {
                  setActiveConvo(convo);
                  setIsAiMode(false);
                }}
                className={`w-full p-3 flex items-center gap-3 rounded-2xl transition-all ${!isAiMode && activeConvo.id === convo.id ? 'bg-slate-100 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
              >
                <img src={convo.avatar} className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700" alt="" />
                <div className="flex-1 text-left overflow-hidden">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="font-bold text-slate-900 dark:text-white truncate">{convo.withUser}</p>
                    <span className="text-[10px] text-slate-400 font-bold">{convo.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{convo.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/50 dark:bg-black/20">
        {/* Chat Header */}
        <div className="bg-white dark:bg-slate-900 px-8 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isAiMode ? (
              <div className="w-12 h-12 blue-gradient rounded-full flex items-center justify-center text-white shadow-lg">
                <Bot size={24} />
              </div>
            ) : (
              <img src={activeConvo.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 dark:border-slate-800" alt="" />
            )}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">{isAiMode ? 'AI Study Tutor' : activeConvo.withUser}</h3>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-3 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <Search size={20} />
            </button>
            <button className="p-3 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Message Area */}
        <div 
          ref={scrollRef}
          className="flex-1 p-8 overflow-y-auto space-y-8 scroll-smooth"
        >
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] ${msg.isMe ? 'bg-blue-600 text-white rounded-t-3xl rounded-bl-3xl shadow-lg shadow-blue-500/20' : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white rounded-t-3xl rounded-br-3xl shadow-sm'} p-5 relative group transition-all hover:scale-[1.01]`}>
                {!msg.isMe && <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-widest">{msg.sender}</p>}
                <p className="leading-relaxed whitespace-pre-wrap text-[15px]">{msg.text}</p>
                <span className={`text-[10px] font-bold mt-2 block opacity-60 ${msg.isMe ? 'text-blue-100' : 'text-slate-400'}`}>{msg.time}</span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-3xl shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-slate-900 p-6 border-t border-slate-100 dark:border-slate-800">
          <div className="max-w-4xl mx-auto relative">
            <input 
              type="text" 
              placeholder={isAiMode ? "Ask AI Tutor anything..." : "Type your message here..."} 
              className="w-full pl-6 pr-32 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 dark:text-white placeholder:text-slate-400 shadow-inner"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
                <Paperclip size={20} />
              </button>
              <button 
                onClick={handleSend}
                className="px-6 py-2.5 blue-gradient text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all flex items-center gap-2"
              >
                Send <Send size={16} />
              </button>
            </div>
          </div>
          {isAiMode && (
            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4 flex items-center justify-center gap-2">
              <Sparkles size={12} className="text-blue-500" /> AI Tutor powered by Google Gemini
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
