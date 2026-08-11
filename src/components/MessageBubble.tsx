import { useState } from "react";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import type { ChatMessage } from "../types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  if (message.loading) {
    return (
      <div className="flex flex-col items-start max-w-[50%]">
        <div className="bg-[#181826] border border-[#232332] rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`flex flex-col max-w-[70%] ${isUser ? "items-end ml-auto" : "items-start"}`}>
      <div
        className={`rounded-2xl px-4 py-2.5 text-sm ${
          isUser
            ? "bg-gradient-to-r from-[#4F8DF7] to-[#818CF8] text-white rounded-tr-sm"
            : "bg-[#181826] border border-[#232332] text-slate-200 rounded-tl-sm"
        }`}
      >
        {message.content}
      </div>
      <div className={`flex items-center gap-2 mt-1 ${isUser ? "mr-1" : "ml-1"}`}>
        <span className="text-[11px] text-slate-600">{message.timestamp}</span>
        {!isUser && (
          <button onClick={handleCopy} className="text-slate-600 hover:text-slate-300" title="Copiar respuesta">
            {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
          </button>
        )}
      </div>
    </div>
  );
}
