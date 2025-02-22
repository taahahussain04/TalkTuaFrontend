"use client"

import { useState, useEffect } from "react"
import { AnimatedAvatar } from "@/components/animated-avatar"
import { ChatInput } from "@/components/chat-input"
import { LiveTranscript } from "@/components/live-transcript"
import { MinimizedTranscript } from "@/components/minimized-transcript"
import { DisconnectButton, LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react"
import {
  useVoiceAssistant,
  BarVisualizer,
  VoiceAssistantControlBar,
  useTrackTranscription,
  useLocalParticipant,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { Chat } from "@livekit/components-react";
import { TrackToggle } from "@livekit/components-react";


interface Message {
  type: "agent" | "user";
  text: string;
  firstReceivedTime: number;
}

export function ConversationArea() {
  const [isMinimized, setIsMinimized] = useState(false)
  const { state, audioTrack } = useVoiceAssistant();
  const [messages, setMessages] = useState<Message[]>([]);




  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden flex">
        <div className="flex-1 flex items-center justify-center">
          <AnimatedAvatar />
        </div>
        {!isMinimized && (
          <div className="w-1/3 min-w-[350px] max-w-[500px] p-4">
            <LiveTranscript onMinimize={() => setIsMinimized(true)} messages={messages} setMessages={setMessages} />
          </div>
        )}
      </div>
      <div className="bg-secondary/50 backdrop-blur-sm p-4 flex justify-center items-center gap-10">
        <DisconnectButton>Leave room</DisconnectButton>
        <TrackToggle source={Track.Source.Microphone} />
      </div>
      {isMinimized && <MinimizedTranscript onMaximize={() => setIsMinimized(false)} />}
    </div>
  )
}

