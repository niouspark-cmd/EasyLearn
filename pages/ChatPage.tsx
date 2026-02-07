import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  MoreVertical, 
  Search, 
  ChevronLeft,
  Phone,
  Video,
  Smile,
  Check,
  CheckCheck,
  Bot
} from 'lucide-react';
import { MOCK_CONVERSATIONS, MOCK_USER } from '../constants';
import { GoogleGenAI } from "@google/genai";
import { useApp } from '../AppContext';

const ChatPage: React.FC = () => {
  const { theme } = useApp();
  const [activeConvo, setActiveConvo] = useState<typeof MOCK_CONVERSATIONS[0] | null>(null);
  const [messages, setMessages] = useState([
    { id: 'm1', text: 'Hello Kofi! How is your WASSCE prep going?', sender: 'Dr. John Appiah', isMe: false, time: '10:30 AM', status: 'read' },
    { id: 'm2', text: 'It is going well, sir. I am struggling a bit with sets though.', sender: 'Kofi Mensah', isMe: true, time: '10:45 AM', status: 'read' },
    { id: 'm3', text: 'Don\'t worry! I just posted a new video lesson on that. Check it out!', sender: 'Dr. John Appiah', isMe: false, time: '10:46 AM', status: 'read' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isAiMode, setIsAiMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Mobile-specific state to manage view
  const [isInChat, setIsInChat] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isInChat]);

  const handleConversationClick = (convo: typeof MOCK_CONVERSATIONS[0]) => {
    setActiveConvo(convo);
    setIsAiMode(false);
    setIsInChat(true);
  };

  const handleAiClick = () => {
    setIsAiMode(true);
    setActiveConvo(null);
    setIsInChat(true);
  };

  const handleBackToSafe = () => {
    setIsInChat(false);
    setTimeout(() => {
      setActiveConvo(null);
      setIsAiMode(false);
    }, 300); // Wait for slide out animation
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: `${MOCK_USER.firstName} ${MOCK_USER.lastName}`,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    if (isAiMode) {
      setIsTyping(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'fake-key' }); // Fallback for demo
        // Simulating AI response for UI demo purposes if no key
        setTimeout(() => {
           setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: "This is a simulated AI response. To use real Gemini, configure your API key.",
            sender: 'Easy Learn AI',
            isMe: false,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'read'
          }]);
          setIsTyping(false);
        }, 1500);

      } catch (err) {
        console.error(err);
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] relative overflow-hidden bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-xl flex">
      
      {/* CONVERSATION LIST (Sidebar on Desktop, Main on Mobile) */}
      <div className={`w-full md:w-96 flex flex-col bg-white dark:bg-slate-900 absolute md:relative inset-0 z-10 transition-transform duration-300 ${isInChat ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Chats</h1>
          <div className="flex gap-2">
            <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">
               <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-6 py-2">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-3">
               <Search size={18} className="text-slate-400" />
               <input type="text" placeholder="Search" className="bg-transparent border-none text-sm w-full focus:ring-0 dark:text-white placeholder-slate-400" />
            </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          {/* AI Bot Item */}
          <button 
            onClick={handleAiClick}
            className={`w-full p-4 flex items-center gap-4 rounded-2xl transition-colors active:scale-95 duration-200 ${isAiMode ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
             <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
               <Bot size={28} />
             </div>
             <div className="flex-1 text-left">
               <h3 className="font-bold text-slate-900 dark:text-white text-lg">AI Tutor</h3>
               <p className="text-sm text-blue-600 dark:text-blue-400 font-medium line-clamp-1">Ready to help you study!</p>
             </div>
          </button>

          {/* User Conversations */}
          {MOCK_CONVERSATIONS.map(convo => (
            <button 
              key={convo.id}
              onClick={() => handleConversationClick(convo)}
              className={`w-full p-4 flex items-center gap-4 rounded-2xl transition-colors active:scale-95 duration-200 ${activeConvo?.id === convo.id ? 'bg-slate-100 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <div className="relative">
                 <img src={convo.avatar} alt="" className="w-14 h-14 rounded-full object-cover border border-slate-100 dark:border-slate-700" />
                 <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{convo.withUser}</h3>
                  <span className="text-xs text-slate-400 font-medium">{convo.timestamp}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{convo.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CHAT WINDOW (Slide-in on Mobile) */}
      <div className={`absolute md:relative inset-0 z-20 md:z-0 flex-1 flex flex-col bg-slate-50 dark:bg-black/50 transition-transform duration-300 ${isInChat ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
         
         {/* Chat Header */}
         <div className="h-20 px-4 md:px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shrink-0 shadow-sm z-10">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleBackToSafe}
                className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="relative">
                {isAiMode ? (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                    <Bot size={20} />
                  </div>
                ) : (
                  <img src={activeConvo?.avatar || MOCK_CONVERSATIONS[0].avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                )}
              </div>
              
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white leading-tight">
                  {isAiMode ? 'AI Study Tutor' : activeConvo?.withUser || 'Select a chat'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {isAiMode ? 'Always Active' : 'Online'}
                </p>
              </div>
            </div>

            <div className="flex gap-1 md:gap-3 text-blue-600 dark:text-blue-500">
               <button className="p-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
                 <Phone size={20} />
               </button>
               <button className="p-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
                  <Video size={22} />
               </button>
               <button className="hidden md:block p-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
                  <Search size={20} />
               </button>
            </div>
         </div>

         {/* Chat Messages */}
         <div 
           className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 bg-[#eef2f6] dark:bg-[#0b1120]"
           ref={scrollRef}
           style={{ backgroundImage: theme === 'light' ? 'url("https://www.transparenttextures.com/patterns/subtle-white-feathers.png")' : 'none' }}
         >
           {/* Date Divider */}
           <div className="flex justify-center my-4">
              <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Today</span>
           </div>

           {messages.map((msg) => (
             <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} group`}>
               <div 
                 className={`max-w-[85%] md:max-w-[70%] px-4 py-2 rounded-2xl relative shadow-sm text-[15px] leading-relaxed ${
                   msg.isMe 
                     ? 'bg-blue-600 text-white rounded-tr-none' 
                     : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none border border-slate-100 dark:border-slate-700'
                 }`}
               >
                 {msg.text}
                 <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${msg.isMe ? 'text-blue-100' : 'text-slate-400'}`}>
                   <span>{msg.time}</span>
                   {msg.isMe && (
                     <CheckCheck size={14} className="opacity-80" />
                   )}
                 </div>
               </div>
             </div>
           ))}
           
           {isTyping && (
             <div className="flex justify-start animate-fade-in">
               <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5 border border-slate-100 dark:border-slate-700">
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
               </div>
             </div>
           )}
         </div>

         {/* Input Area */}
         <div className="p-3 md:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 md:gap-4 shrink-0">
           <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hidden md:block">
             <Smile size={24} />
           </button>
           <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
             <Paperclip size={22} />
           </button>
           
           <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
             <input 
               type="text" 
               placeholder="Type a message..." 
               className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 max-h-32"
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
             />
           </div>

           <button 
             onClick={handleSend}
             disabled={!inputText.trim()}
             className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
                inputText.trim() 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-blue-500/30' 
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
             }`}
           >
             <Send size={20} className={inputText.trim() ? 'ml-0.5' : ''} />
           </button>
         </div>
         
      </div>

    </div>
  );
};

export default ChatPage;
