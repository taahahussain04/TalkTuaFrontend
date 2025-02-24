"use client"

import { Sidebar } from "@/components/sidebar"
import { ConversationArea } from "@/components/conversation-area"
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react"
import { useCallback, useState, useEffect } from "react"

export default function Home() {
  const [token, setToken] = useState("");

  const getToken = async () => {
    try {
      console.log("run")
      const response = await fetch(`http://localhost:8000/getToken`);
      const token = await response.text();
      setToken(token);
      console.log(token)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {!token && (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-xl font-semibold text-primary">Ready to start your conversation?</h2>
          <button
            onClick={getToken}
            className="px-6 py-3 mt-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Connect
          </button>
        </div>
      )}
      {token && (
        <LiveKitRoom
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL}
          token={token}
          connect={true}
          video={false}
          audio={true}
      >
        <RoomAudioRenderer />
        <div className="flex h-screen bg-gradient-to-br from-background to-muted">
          <main className="flex-1 overflow-hidden p-4">
            <ConversationArea setToken={setToken} />
          </main>
          </div>
        </LiveKitRoom>
      )}
    </>
  )
}

