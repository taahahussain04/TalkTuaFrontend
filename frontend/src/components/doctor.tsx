import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
} from "@heygen/streaming-avatar";
import React, { useEffect, useRef, useState } from 'react';


let streamingAvatar;
export default function Doctor() {
  

  
  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75"></div>
      <Avatar className="relative h-64 w-64">
        <AvatarImage src="/placeholder.svg" alt="Doctor Avatar" />
        <AvatarFallback className="text-4xl bg-muted">DR</AvatarFallback>
      </Avatar>
    </div>
  )
}