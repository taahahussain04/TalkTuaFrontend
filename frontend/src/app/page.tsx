"use client"

import { Sidebar } from "@/components/sidebar"
import { ConversationArea } from "@/components/conversation-area"
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react"
import { useState } from "react"

export default function Home() {
  const [token, setToken] = useState("");
  return (
    <>
      <button 
        onClick={() => setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDAyNjQ5MjEsImlzcyI6IkFQSUw0RGQyTUZ3NTQ3WSIsIm5iZiI6MTc0MDI2NDAyMSwic3ViIjoiNCIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiI0Iiwicm9vbUpvaW4iOnRydWV9fQ.QsY5oVS5ymSnU0tsTJQlVTgX_yMkqn9vtDAWgZ0UL8E")}
        className="fixed top-4 right-4 z-10 px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        Connect
      </button>
      <LiveKitRoom
        serverUrl={"wss://project-94gw1jyq.livekit.cloud/"}
        token={token}
        connect={true}
        video={false}
        audio={true}
      >
        <RoomAudioRenderer />
        <div className="flex h-screen bg-gradient-to-br from-background to-muted">
          <Sidebar />
          <main className="flex-1 overflow-hidden p-4">
            <ConversationArea />
          </main>
        </div>
      </LiveKitRoom>
    </>
  )
}

