// @ts-nocheck

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  useVoiceAssistant,
  BarVisualizer,
  VoiceAssistantControlBar,
  useTrackTranscription,
  useLocalParticipant,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useState, useEffect } from "react";
import { Chat } from "@livekit/components-react";
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"


interface LiveTranscriptProps {
  onMinimize: () => void
  messages: Message[]
  setMessages: (messages: Message[]) => void
}

interface Message {
  type: "agent" | "user";
  text: string;
  firstReceivedTime: number;
}

const Message = ({ type, text }: { type: string, text: string }) => {
  return <div className="message">
    <strong className={`message-${type}`}>
      {type === "agent" ? "Agent: " : "You: "}
    </strong>
    <span className="message-text">{text}</span>
  </div>;
};

export function LiveTranscript({ onMinimize, messages, setMessages }: LiveTranscriptProps) {
  const { state, audioTrack, agentTranscriptions } = useVoiceAssistant()
  const localParticipant = useLocalParticipant()
  const { segments: userTranscriptions } = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  })
  const [inputValue, setInputValue] = useState("")

  const handleSend = () => {
    if (inputValue.trim()) {
      console.log("Sending message:", inputValue.trim())
      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          text: inputValue.trim(),
          firstReceivedTime: Date.now(),
        },
      ])
      setInputValue("")
    }
    console.log("Messages:", messages)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }


  useEffect(() => {
    const allMessages = [
      ...(agentTranscriptions?.map((t) => ({ ...t, type: "agent" })) ?? []),
      ...(userTranscriptions?.map((t) => ({ ...t, type: "user" })) ?? []),
    ].sort((a, b) => a.firstReceivedTime - b.firstReceivedTime)
    setMessages(allMessages as Message[])
  }, [agentTranscriptions, userTranscriptions, setMessages])

  return (
    <Card className="h-full border-none shadow-none bg-background/50 backdrop-blur-sm flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 shrink-0">
        <CardTitle className="text-2xl font-bold">Live Transcript</CardTitle>
        <Button variant="ghost" size="icon" onClick={onMinimize}>
          <Minus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0 flex-grow flex flex-col overflow-hidden">
        <ScrollArea className="flex-grow px-4 mb-4 h-[calc(100%-80px)]">
          <div className="space-y-4 pb-4">
            {messages.map((msg, index) => (
              <Card key={index} className="bg-muted/50">
                <CardContent className="p-4">
                  <span className="font-semibold text-primary">{msg.type === "agent" ? "Agent: " : "You: "}</span>
                  {msg.text}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
        {/* <div className="p-4 bg-background/50 backdrop-blur-sm shrink-0">
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
        </div> */}
      </CardContent>
    </Card>
  )
}

