import { useState, useRef, useEffect, useCallback } from "react";
import { processMessage } from "../utils/chatEngine";
import { getAIResponse, getStoredApiKey, storeApiKey } from "../utils/aiService";
import { trackChatInteraction, trackEngagement, trackFeatureUsage } from "../utils/analyticsService";

const WELCOME = {
  id: 0, sender: "bot",
  text: "Namaste! I am the **VoteSaathi Assistant**. I can help you with voter registration, voting methods, election dates, candidate research, and more.\n\nWhat would you like to know?",
};
const INITIAL_SUGGESTIONS = ["Voter Registration", "Voting Methods", "Election Timeline", "Candidate Research", "Take a Quiz"];
const FALLBACK_SUGGESTIONS = ["Voter Registration", "Voting Methods", "Election Timeline", "Candidate Research", "Take a Quiz", "Find Resources"];

/**
 * Custom hook to manage the VoteSaathi chat logic.
 * Handles state, message processing, and analytics.
 */
export function useChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState(INITIAL_SUGGESTIONS);
  const [isTyping, setIsTyping] = useState(false);
  const [quizState, setQuizState] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(getStoredApiKey);
  const [keyInput, setKeyInput] = useState("");
  
  const endRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !showSettings) {
      // Small delay to ensure the input is rendered before focusing
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showSettings]);

  const addBotMessage = useCallback((text, sug) => {
    setMessages((p) => [...p, { id: Date.now() + 1, sender: "bot", text }]);
    setSuggestions(sug || []);
    setIsTyping(false);
    trackChatInteraction('BotMessage', 'ResponseReceived');
  }, []);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text?.trim();
    if (!trimmed) return;

    const userMsg = { id: Date.now(), sender: "user", text: trimmed };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setSuggestions([]);
    setIsTyping(true);

    trackChatInteraction('UserMessage', trimmed.substring(0, 30));

    // 1. Try local engine
    const localResponse = processMessage(trimmed, quizState);
    if (localResponse) {
      setTimeout(() => {
        addBotMessage(localResponse.text, localResponse.suggestions);
        if (localResponse.quiz !== undefined) setQuizState(localResponse.quiz);
      }, 400 + Math.random() * 300);
      return;
    }

    // 2. Try AI if API key is present
    if (apiKey) {
      try {
        const history = [...messages, userMsg];
        const aiText = await getAIResponse(trimmed, apiKey, history);
        if (aiText) {
          addBotMessage(aiText, FALLBACK_SUGGESTIONS);
          return;
        }
      } catch (err) {
        console.error("AI Service Error:", err);
      }
    }

    // 3. Fallback
    setTimeout(() => {
      addBotMessage(
        "I am not sure about that. I can help with voter registration, voting methods, election dates, candidate research, and more.\n\n**Tip:** Add a Gemini API key in settings for AI-powered answers!",
        FALLBACK_SUGGESTIONS
      );
    }, 500);
  }, [quizState, apiKey, messages, addBotMessage]);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState) {
        trackFeatureUsage('ChatWidgetOpened');
        trackEngagement('ChatStarted', 'UserInitiated');
      }
      return newState;
    });
  }, []);

  const resetChat = useCallback(() => {
    setMessages([WELCOME]);
    setSuggestions(INITIAL_SUGGESTIONS);
    setQuizState(null);
    setShowSettings(false);
    trackEngagement('ChatRestarted', 'UserInitiated');
  }, []);

  const saveApiKey = useCallback(() => {
    const trimmed = keyInput.trim();
    storeApiKey(trimmed);
    setApiKey(trimmed);
    setShowSettings(false);
    if (trimmed) {
      setMessages((p) => [...p, { id: Date.now(), sender: "bot", text: "AI mode **activated**! I can now answer any election-related question using Google Gemini." }]);
      trackEngagement('AIActivated', 'GeminiAPI');
    }
  }, [keyInput]);

  const removeApiKey = useCallback(() => {
    storeApiKey("");
    setApiKey("");
    setKeyInput("");
    setShowSettings(false);
    setMessages((p) => [...p, { id: Date.now(), sender: "bot", text: "AI mode **deactivated**. I will use my built-in knowledge base." }]);
    trackEngagement('AIDeactivated', 'GeminiAPI');
  }, []);

  return {
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
  };
}
