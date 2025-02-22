// @ts-nocheck

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import React from "react"


interface Message {
  type: "agent" | "user";
  text: string;
  firstReceivedTime: number;
}

export function ChatInput({setMessages}: {setMessages: (messages: Message[]) => void}) {
  const [inputValue, setInputValue] = React.useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages(prev => [...prev, {
        type: "user",
        text: inputValue.trim(),
        firstReceivedTime: Date.now()
      }]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex space-x-2">
      <Input 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message here..." 
        className="flex-1" 
      />
      <Button size="icon" className="rounded-full" onClick={handleSend}>
        <Send className="h-4 w-4" />
      </Button>
    </div>
  )
}

