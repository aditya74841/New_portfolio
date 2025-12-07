"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
// Assuming you have an icon library like 'lucide-react' installed
import {
  Send,
  Loader2,
  MessageCircle,
  Bot,
  User,
  CornerUpLeft,
} from "lucide-react";
import { SERVER_API_URL } from "../constant";

// You should define your constant or place it in a config file
// const SERVER_API_URL = "YOUR_SERVER_API_URL_HERE"; // Placeholder

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PortfolioAIChatPage = () => {
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const existingId = searchParams.get("id");

  // Load existing chat
  useEffect(() => {
    if (existingId) {
      fetchMessages(existingId);
    }
  }, [existingId]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${SERVER_API_URL}/ai/chat/${id}`);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Could not load chat history. Please start a new conversation.");
    } finally {
      setLoading(false);
    }
  };

  // Send message (non-streaming)
  const startChat = async () => {
    if (!chat.trim() || loading) return;

    const userMessage: Message = { role: "user", content: chat.trim() };
    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = chat.trim();
    setChat("");
    setLoading(true);
    setError(null);

    try {
      const url = existingId
        ? `${SERVER_API_URL}/ai/chat?id=${existingId}`
        : `${SERVER_API_URL}/ai/chat`;

      const response = await axios.post(url, { message: messageToSend });

      const aiMessage: Message = {
        role: "assistant",
        content: response.data.response,
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Redirect to chat ID if new chat
      if (!existingId && response.data.aiId) {
        // Use replace to prevent back button issues
        router.replace(`?id=${response.data.aiId}`);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setError("A server error occurred. Please try a simpler message.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "An error occurred while processing your request. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      startChat();
    }
  };

  const NewChatButton = () => (
    <button
      onClick={() => {
        // setChat("");
        // router.push("/ai");
        router.replace("/ai")
      }} // Assumes the root path loads the chat component without an ID
      className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-blue-400 transition"
    >
      <CornerUpLeft className="w-4 h-4" />
      <span>Start New Chat</span>
    </button>
  );

  const MessageBubble = ({ msg }: { msg: Message }) => (
    <div
      className={`flex items-start gap-3 ${
        msg.role === "user" ? "justify-end" : "justify-start"
      } animate-fadeIn`}
    >
      {/* Avatar (Only for Assistant on the left) */}
      {msg.role === "assistant" && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Message Content */}
      <div
        className={`max-w-3xl p-4 rounded-xl shadow-2xl transition duration-300 transform hover:shadow-blue-900/50 ${
          msg.role === "user"
            ? "bg-gray-700 text-gray-100 rounded-tr-sm"
            : "bg-gray-800 text-white rounded-tl-sm"
        }`}
      >
        <p className="whitespace-pre-wrap break-words text-sm md:text-base font-light leading-relaxed">
          {msg.content}
        </p>
      </div>

      {/* Avatar (Only for User on the right) */}
      {msg.role === "user" && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center shadow-lg">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      {/* Header (Top Bar) */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-xl p-4 flex justify-between items-center z-10">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-bold tracking-wider text-blue-400">
            /portfólio_AI_Chat
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {existingId && (
            <span className="text-xs text-gray-500">
              ID:{" "}
              <span className="font-mono text-gray-400">
                {existingId.substring(0, 8)}...
              </span>
            </span>
          )}
          <NewChatButton />
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {loading && messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-blue-500">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <p>Loading conversation...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-10">
            <Bot className="w-12 h-12 text-blue-500 mb-4" />
            <p className="text-gray-400 text-xl font-semibold mb-2">
              Welcome to my Portfolio AI Assistant
            </p>
            <p className="text-gray-500 max-w-md">
              Ask me about my experience, skills, or projects. I'm ready to
              chat!
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => <MessageBubble key={idx} msg={msg} />)
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Box and Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 p-4 sticky bottom-0 z-10">
        {error && (
          <div className="text-red-400 text-sm mb-2 p-2 bg-red-900/30 rounded-lg">
            **Error:** {error}
          </div>
        )}
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder={
              loading
                ? "Waiting for response..."
                : "Ask me anything about my portfolio..."
            }
            className="flex-1 px-5 py-3 rounded-full border border-gray-600 bg-gray-700 text-white shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200 placeholder-gray-500 disabled:opacity-70 disabled:cursor-not-allowed"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            autoFocus
          />

          <button
            className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-500 disabled:bg-gray-600 disabled:shadow-none transition duration-200"
            onClick={startChat}
            disabled={loading || !chat.trim()}
            title="Send Message"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5 -translate-x-px" />
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioAIChatPage;

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useRouter, useSearchParams } from "next/navigation";
// import { SERVER_API_URL } from "../constant";

// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// const Page = () => {
//   const [chat, setChat] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const existingId = searchParams.get("id");

//   // Load existing chat
//   useEffect(() => {
//     if (existingId) {
//       fetchMessages(existingId);
//     }
//   }, [existingId]);

//   // Auto-scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const fetchMessages = async (id: string) => {
//     try {
//       const response = await axios.get(`${SERVER_API_URL}/ai/chat/${id}`);
//       setMessages(response.data.messages || []);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   // Send message (non-streaming)
//   const startChat = async () => {
//     if (!chat.trim()) return;

//     const userMessage: Message = { role: "user", content: chat.trim() };
//     setMessages((prev) => [...prev, userMessage]);
//     const messageToSend = chat.trim();
//     setChat("");
//     setLoading(true);

//     try {
//       const url = existingId
//         ? `${SERVER_API_URL}/ai/chat?id=${existingId}`
//         : `${SERVER_API_URL}/ai/chat`;

//       const response = await axios.post(url, { message: messageToSend });

//       const aiMessage: Message = {
//         role: "assistant",
//         content: response.data.response,
//       };

//       setMessages((prev) => [...prev, aiMessage]);

//       // Redirect to chat ID if new chat
//       if (!existingId && response.data.aiId) {
//         router.push(`?id=${response.data.aiId}`);
//       }
//     } catch (error) {
//       console.error("Chat Error:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content:
//             "An error occurred while processing your request. Please try again.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 to-gray-300">
//       {/* Header */}
//       <header className="bg-white shadow-md p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-semibold text-gray-800">
//           AI Chat Assistant
//         </h1>
//         {existingId && (
//           <span className="text-sm rounded-full bg-gray-200 px-3 py-1 text-gray-700">
//             Chat ID: {existingId}
//           </span>
//         )}
//       </header>

//       {/* Chat Messages */}
//       <main className="flex-1 overflow-y-auto p-6 space-y-4">
//         {messages.length === 0 ? (
//           <div className="flex items-center justify-center h-full">
//             <p className="text-gray-500 text-lg">
//               Start a conversation with the AI assistant
//             </p>
//           </div>
//         ) : (
//           messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`flex ${
//                 msg.role === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-xl px-4 py-3 rounded-2xl shadow-md ${
//                   msg.role === "user"
//                     ? "bg-blue-600 text-white"
//                     : "bg-white text-gray-900"
//                 }`}
//               >
//                 <p className="whitespace-pre-wrap break-words text-sm md:text-base">
//                   {msg.content}
//                 </p>
//               </div>
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </main>

//       {/* Input Box */}
//       <footer className="bg-white border-t shadow-inner p-4">
//         <div className="flex gap-3">
//           <input
//             type="text"
//             placeholder="Type your message..."
//             className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-black shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             value={chat}
//             onChange={(e) => setChat(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && !loading && startChat()}
//             disabled={loading}
//           />

//           <button
//             className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 shadow-md transition"
//             onClick={startChat}
//             disabled={loading || !chat.trim()}
//           >
//             {loading ? "Sending..." : "Send"}
//           </button>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Page;
