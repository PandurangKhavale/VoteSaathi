import { useTheme } from "../context/ThemeContext";
import ChatMessage from "./ChatMessage";
import { useChat } from "../hooks/useChat";
import { trackChatInteraction } from "../utils/analyticsService";

export default function ChatWidget() {
  const { theme } = useTheme();
  const {
    isOpen,
    messages,
    input,
    suggestions,
    isTyping,
    quizState,
    showSettings,
    apiKey,
    keyInput,
    endRef,
    inputRef,
    setInput,
    setKeyInput,
    setIsOpen,
    setShowSettings,
    sendMessage,
    toggleChat,
    resetChat,
    saveApiKey,
    removeApiKey,
  } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const isDark = theme === 'dark';

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          id="chat-widget-toggle"
          onClick={toggleChat}
          className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group ${
            isDark
              ? 'bg-gradient-to-br from-civic-blue to-civic-purple text-white shadow-civic-blue/40'
              : 'bg-gradient-to-br from-civic-blue to-blue-600 text-white shadow-civic-blue/30'
          }`}
          aria-label="Open chat assistant"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full animate-ping opacity-75 ${isDark ? 'bg-civic-gold' : 'bg-civic-gold-light'}`} />
          <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${isDark ? 'bg-civic-gold' : 'bg-civic-gold-light'}`} />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] w-[calc(100vw-2rem)] sm:w-[400px] h-[540px] max-h-[calc(100vh-2rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden border transition-all duration-300 animate-slide-up ${
          isDark
            ? 'bg-surface-secondary border-border-color shadow-black/50'
            : 'bg-white border-gray-200 shadow-xl'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-civic-blue to-blue-700 px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shadow-inner">VS</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm">VoteSaathi Assistant</h3>
              <p className="text-blue-200 text-xs flex items-center gap-1">
                {apiKey ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                    AI Powered
                  </>
                ) : (
                  "Knowledge Base"
                )}
              </p>
            </div>
            <button
              onClick={resetChat}
              className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Main Menu / Restart"
              title="Main Menu"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Settings"
              title="Settings"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-2.573-1.066c-1.543 1.543.826 3.31 2.37 2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Settings panel */}
          {showSettings && (
            <div className={`px-4 py-3 border-b shrink-0 animate-fade-in ${
              isDark ? 'bg-surface-tertiary border-border-color' : 'bg-blue-50 border-blue-100'
            }`}>
              <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-text-primary' : 'text-gray-700'}`}>Gemini API Key (free tier)</p>
              <p className={`text-xs mb-2 ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                Get a free key at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-civic-blue hover:underline">aistudio.google.com/apikey</a>
              </p>
              <div className="flex gap-2">
                <input
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  type="password"
                  placeholder={apiKey ? "Key saved (enter new to replace)" : "Paste your API key..."}
                  className={`flex-1 px-3 py-1.5 text-xs rounded-lg border focus:border-civic-blue outline-none transition-colors ${
                    isDark
                      ? 'bg-surface-secondary border-border-color text-text-primary placeholder-text-muted'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                />
                <button
                  onClick={saveApiKey}
                  className="px-3 py-1.5 text-xs bg-civic-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Save
                </button>
              </div>
              {apiKey && (
                <button
                  onClick={removeApiKey}
                  className="mt-2 text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  Remove API key
                </button>
              )}
            </div>
          )}

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 ${isDark ? 'bg-surface-primary/50' : 'bg-gray-50/50'}`}>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} theme={theme} />
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-civic-blue to-civic-purple flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md">
                  VS
                </div>
                <div className={`rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border ${
                  isDark ? 'bg-surface-secondary border-border-color' : 'bg-white border-gray-100'
                }`}>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick replies */}
          {suggestions.length > 0 && (
            <div className={`px-3 py-2 border-t flex flex-wrap gap-1.5 max-h-20 overflow-y-auto shrink-0 ${
              isDark ? 'border-border-color bg-surface-primary' : 'border-gray-100 bg-white'
            }`}>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    sendMessage(s);
                    trackChatInteraction('QuickReply', s);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium whitespace-nowrap transition-all duration-200 hover:scale-105 ${
                    isDark
                      ? 'border-civic-blue/30 text-civic-blue-light hover:bg-civic-blue hover:text-white'
                      : 'border-civic-blue/40 text-civic-blue hover:bg-civic-blue hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className={`px-3 py-2 border-t flex gap-2 shrink-0 ${
              isDark ? 'border-border-color bg-surface-primary' : 'border-gray-200 bg-white'
            }`}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={quizState?.active ? "Enter 1, 2, 3, or 4..." : "Ask me anything about elections..."}
              className={`flex-1 px-3 py-2 text-sm rounded-xl border focus:border-civic-blue focus:ring-1 focus:ring-civic-blue/30 outline-none transition-all ${
                isDark
                  ? 'bg-surface-secondary border-border-color text-text-primary placeholder-text-muted'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              }`}
              aria-label="Type your message"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-civic-blue to-civic-purple text-white flex items-center justify-center hover:shadow-lg hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all shrink-0"
              aria-label="Send message"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
