// @ts-nocheck

"use client"


import AnimatedAvatar from "@/components/animated-avatar"
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
import React, { useEffect, useRef, useState } from 'react';
import Doctor from "@/components/doctor";
import '@livekit/components-styles';







interface Message {
  type: "agent" | "user";
  text: string;
  firstReceivedTime: number;
}

export function ConversationArea({setToken}: {setToken: (token: string) => void}) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const { state, audioTrack } = useVoiceAssistant();

  const handleDisconnect = () => {
    setToken("");
    setIsConnected(false);
  }

  const handleConnect = () => {
    setIsConnected(true);
  }

  return (
    <div className="h-full flex flex-col">
      <>
          <div className="flex-1 overflow-hidden flex">
            <div className="flex-1 flex items-center justify-center">
              <div className="w-48 h-48">
                <BarVisualizer 
                  state={state} 
                  barCount={9} 
                  trackRef={audioTrack}
                  style={{ gap: '8px' }}
                />
              </div>
            </div>
              <div className="w-1/3 min-w-[350px] max-w-[500px] p-4">
                <LiveTranscript onMinimize={() => setIsMinimized(true)} setIsMinimized={setIsMinimized} isMinimized={isMinimized} messages={messages} setMessages={setMessages} />
              </div>
          </div>
          <div className="bg-secondary/50 backdrop-blur-sm p-4 flex justify-center items-center gap-10">
            <DisconnectButton onClick={handleDisconnect}>Leave room</DisconnectButton>
            <TrackToggle source={Track.Source.Microphone} />
          </div>
          {/* {isMinimized && <MinimizedTranscript onMaximize={() => setIsMinimized(false)} />} */}
        </>
    </div>
  )
}

