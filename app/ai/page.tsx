
// // ===== FRONTEND: pages/ai/chat.tsx =====
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

//   // Fetch existing messages on mount if ID exists
//   useEffect(() => {
//     if (existingId) {
//       fetchMessages(existingId);
//     }
//   }, [existingId]);

//   // Auto scroll to bottom
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

//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: messageToSend }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const reader = response.body?.getReader();
//       if (!reader) {
//         throw new Error("No response body");
//       }

//       let aiResponse = "";
//       const decoder = new TextDecoder();
//       let aiIdReceived = false;

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         const text = decoder.decode(value);
//         aiResponse += text;

//         // Try to extract aiId from response if it's JSON at the end
//         if (text.includes("aiId") && !aiIdReceived) {
//           try {
//             const jsonMatch = text.match(/"aiId":"([^"]+)"/);
//             if (jsonMatch && !existingId) {
//               router.push(`?id=${jsonMatch[1]}`);
//               aiIdReceived = true;
//             }
//           } catch (e) {
//             // Continue streaming if JSON parsing fails
//           }
//         }

//         // Update message as it streams in
//         setMessages((prev) => {
//           const lastMessage = prev[prev.length - 1];
//           if (lastMessage?.role === "assistant") {
//             return [
//               ...prev.slice(0, -1),
//               { role: "assistant" as const, content: aiResponse },
//             ];
//           }
//           return [...prev, { role: "assistant" as const, content: aiResponse }];
//         });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       const errorMessage: Message = {
//         role: "assistant",
//         content: `Error: ${error instanceof Error ? error.message : "Unable to get response. Please try again."}`,
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 p-4">
//         <h1 className="text-2xl font-bold text-gray-800">AI Chat Assistant</h1>
//         {existingId && (
//           <p className="text-sm text-gray-500 mt-1">Chat ID: {existingId}</p>
//         )}
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.length === 0 ? (
//           <div className="flex items-center justify-center h-full">
//             <p className="text-gray-400 text-lg">
//               Start a new conversation or continue an existing one
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
//                 className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                   msg.role === "user"
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-gray-800"
//                 }`}
//               >
//                 <p className="whitespace-pre-wrap break-words">{msg.content}</p>
//               </div>
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="bg-white border-t border-gray-200 p-4">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Enter your prompt"
//             className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//             value={chat}
//             onChange={(e) => setChat(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && !loading && startChat()}
//             disabled={loading}
//           />
//           <button
//             className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
//             onClick={startChat}
//             disabled={loading || !chat.trim()}
//           >
//             {loading ? "Sending..." : "Generate"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;



// ===== FRONTEND: pages/ai/chat.tsx =====
"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { SERVER_API_URL } from "../constant";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Page = () => {
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const existingId = searchParams.get("id");

  // Fetch existing messages on mount if ID exists
  useEffect(() => {
    if (existingId) {
      fetchMessages(existingId);
    }
  }, [existingId]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async (id: string) => {
    try {
      const response = await axios.get(`${SERVER_API_URL}/ai/chat/${id}`);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const startChat = async () => {
    if (!chat.trim()) return;

    const userMessage: Message = { role: "user", content: chat.trim() };
    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = chat.trim();
    setChat("");
    setLoading(true);

    try {
      const url = existingId
        ? `${SERVER_API_URL}/ai/chat?id=${existingId}`
        : `${SERVER_API_URL}/ai/chat`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response body");
      }

      let aiResponse = "";
      const decoder = new TextDecoder();
      let aiIdReceived = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        
        // Check for metadata separator
        if (text.includes("__METADATA__")) {
          const [contentPart, metadataPart] = text.split("__METADATA__");
          aiResponse += contentPart;

          // Extract aiId from metadata
          if (metadataPart && !aiIdReceived) {
            try {
              const metadata = JSON.parse(metadataPart.trim());
              if (metadata.aiId && !existingId) {
                router.push(`?id=${metadata.aiId}`);
                aiIdReceived = true;
              }
            } catch (e) {
              console.error("Error parsing metadata:", e);
            }
          }
        } else {
          aiResponse += text;
        }

        // Update message as it streams in
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage?.role === "assistant") {
            return [
              ...prev.slice(0, -1),
              { role: "assistant" as const, content: aiResponse },
            ];
          }
          return [...prev, { role: "assistant" as const, content: aiResponse }];
        });
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: `Error: ${error instanceof Error ? error.message : "Unable to get response. Please try again."}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-800">AI Chat Assistant</h1>
        {existingId && (
          <p className="text-sm text-gray-500 mt-1">Chat ID: {existingId}</p>
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-lg">
              Start a new conversation or continue an existing one
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter your prompt"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !loading && startChat()}
            disabled={loading}
          />
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
            onClick={startChat}
            disabled={loading || !chat.trim()}
          >
            {loading ? "Sending..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
