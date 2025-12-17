"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "./Header";
import WelcomeScreen from "./WelcomeScreen";
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";
import LoadingScreen from "./LoadingScreen";
import ErrorMessage from "./ErrorMessage";
import { Message } from "./types";
import { chatService } from "./chatService";

const AiHome = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id");

  // Load existing chat when ID is present
  const loadExistingChat = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedMessages = await chatService.getMessages(id);
      setMessages(fetchedMessages);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Could not load chat history. Please start a new conversation.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (chatId) {
      loadExistingChat(chatId);
    }
  }, [chatId, loadExistingChat]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!message.trim() || isTyping) return;

    const userMessage: Message = {
      role: "user",
      content: message.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = message.trim();
    setMessage("");
    setIsTyping(true);
    setError(null);

    try {
      const response = await chatService.sendMessage(messageToSend, chatId);

      const aiMessage: Message = {
        role: "assistant",
        content: response.response,
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Redirect to chat ID if new chat
      if (!chatId && response.aiId) {
        router.replace(`/ai?id=${response.aiId}`);
      }
    } catch (err) {
      console.error("Chat Error:", err);
      setError("A server error occurred. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "An error occurred while processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setMessage("");
    setError(null);
    router.replace("/ai");
  };

  const handleShare = async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setMessage(prompt);
  };

  const hasStartedChat = messages.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-cyan-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <Header
        onNewChat={handleNewChat}
        onShare={handleShare}
        chatId={chatId}
        copySuccess={copySuccess}
      />

      {/* Main Content Area */}
      <main
        id="main-content"
        ref={chatContainerRef}
        className="pt-24 pb-48 min-h-screen overflow-y-auto px-6"
        role="main"
        aria-label="AI Chat conversation area"
      >
        {/* Error Message */}
        {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

        {/* Loading State */}
        {isLoading ? (
          <LoadingScreen />
        ) : !hasStartedChat ? (
          <WelcomeScreen onPromptClick={handlePromptClick} />
        ) : (
          <ChatContainer messages={messages} isTyping={isTyping} />
        )}
      </main>

      {/* Chat Input */}
      <ChatInput
        message={message}
        onMessageChange={setMessage}
        onSend={handleSend}
        isDisabled={isTyping || isLoading}
      />
    </div>
  );
};

export default AiHome;
