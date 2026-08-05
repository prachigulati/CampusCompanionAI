import React from 'react';
import { 
  Bot, Radio, Volume2, Mic, MicOff, Smile, Send 
} from 'lucide-react';

export default function ChatView({ 
  chatMessages, chatInput, setChatInput, isChatLoading, isSpeaking, isListening, 
  speakText, toggleListening, handleSendChatMessage, processAndSend, chatMessagesEndRef 
}) {
  return (
    <div className="w-full h-[calc(100vh-140px)] flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-[#E0F780] text-slate-900 flex items-center justify-center font-bold shadow-inner">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse"></span>
          </div>
          <div>
            <h3 className="font-bold text-sm flex items-center gap-2">
              Campus Companion <span className="text-[10px] bg-[#E0F780]/20 text-[#E0F780] px-2 py-0.5 rounded-full font-semibold border border-[#E0F780]/30 flex items-center gap-1"><Radio className="w-3 h-3 animate-pulse" /> Live Voice Enabled</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">Talk naturally with real-time female voice responses.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isSpeaking && (
            <span className="text-xs font-bold text-[#E0F780] flex items-center gap-1.5 animate-pulse bg-white/10 px-3 py-1 rounded-full border border-[#E0F780]/20">
              <Volume2 className="w-4 h-4 text-[#E0F780]" /> Speaking...
            </span>
          )}
          {isListening && (
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 animate-pulse bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
              <Mic className="w-4 h-4 animate-bounce text-rose-400" /> Listening to you...
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#F8F9FA]">
        {chatMessages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2.5`}>
            {msg.sender === 'bot' && (
              <div className="w-7 h-7 rounded-full bg-slate-900 text-[#E0F780] flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                AI
              </div>
            )}

            <div className={`max-w-xl p-4 rounded-3xl text-xs leading-relaxed shadow-sm transition-all ${
              msg.sender === 'user' 
                ? 'bg-black text-white rounded-br-xs' 
                : 'bg-white text-slate-800 border border-gray-200/80 rounded-bl-xs'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
              
              <div className={`flex items-center justify-between gap-4 mt-2 pt-2 border-t ${msg.sender === 'user' ? 'border-white/10 text-slate-400' : 'border-gray-100 text-slate-400'} text-[10px]`}>
                <span>{msg.timestamp}</span>
                
                {msg.sender === 'bot' && (
                  <button 
                    onClick={() => speakText(msg.text)} 
                    className="flex items-center gap-1 hover:text-slate-800 transition font-medium bg-gray-50 hover:bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200/60"
                    title="Replay voice response"
                  >
                    <Volume2 className="w-3 h-3 text-slate-500" /> Replay Voice
                  </button>
                )}
              </div>
            </div>

            {msg.sender === 'user' && (
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Ava" 
                className="w-7 h-7 rounded-full object-cover shrink-0 border border-gray-200 shadow-sm"
              />
            )}
          </div>
        ))}

        {isChatLoading && (
          <div className="flex justify-start items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-[#E0F780] flex items-center justify-center text-xs font-bold shrink-0">
              AI
            </div>
            <div className="bg-white text-slate-500 p-4 rounded-3xl rounded-bl-xs text-xs border border-gray-200/80 shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span className="ml-1 font-medium">Generating real-time voice response...</span>
            </div>
          </div>
        )}
        <div ref={chatMessagesEndRef} />
      </div>

      <div className="px-6 py-2 bg-white border-t border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Smile className="w-3.5 h-3.5" /> Quick Voice Prompts:
        </span>
        {[
          "How's my attendance status?",
          "What's my schedule for today?",
          "Am I approved for duty leave?",
          "Give me a quick exam pep talk!"
        ].map((prompt, i) => (
          <button
            key={i}
            onClick={() => {
              setChatInput(prompt);
              processAndSend(prompt);
            }}
            className="px-3 py-1.5 bg-gray-50 hover:bg-slate-100 text-slate-700 text-[11px] font-semibold rounded-full border border-gray-200/80 whitespace-nowrap transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      <form onSubmit={handleSendChatMessage} className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
        <div className="relative flex-1 flex items-center">
          <input 
            type="text" 
            value={chatInput} 
            onChange={(e) => setChatInput(e.target.value)} 
            placeholder={isListening ? "Listening to your voice..." : "Type or click the microphone to speak naturally..."} 
            className={`w-full bg-gray-50 border rounded-full pl-5 pr-12 py-3.5 text-xs text-slate-800 focus:outline-none shadow-2xs font-medium transition ${
              isListening ? 'border-rose-500 bg-rose-50/20' : 'border-gray-200 focus:border-slate-400'
            }`}
          />
          
          <button 
            type="button" 
            onClick={toggleListening}
            className={`absolute right-3.5 p-2 rounded-full transition ${
              isListening ? 'bg-rose-500 text-white animate-pulse shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-gray-200/60'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        <button 
          type="submit" 
          disabled={isChatLoading || !chatInput.trim()} 
          className="p-3.5 bg-black text-white rounded-full hover:bg-slate-800 disabled:opacity-50 transition shadow-sm flex items-center justify-center shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}