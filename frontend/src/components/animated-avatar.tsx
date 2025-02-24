import React, { useEffect, useRef, useState } from 'react';
import StreamingAvatar, { AvatarQuality, StreamingEvents } from '@heygen/streaming-avatar';

interface SessionData {
  // Add specific session data properties based on your needs
  [key: string]: any;
}

interface StreamReadyEvent extends CustomEvent {
  detail: MediaStream;
}

interface Props {
  textToSpeak?: string;
}

const AvatarComponent: React.FC<Props> = ({ textToSpeak }) => {
  const [avatar, setAvatar] = useState<StreamingAvatar | null>(null);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Helper function to fetch access token
  const fetchAccessToken = async (): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_HEYGEN_API_KEY;
    const response = await fetch('https://api.heygen.com/v1/streaming.create_token', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey || '',
      },
    });
    const { data } = await response.json();
    return data.token;
  };

  // Handle when avatar stream is ready
  const handleStreamReady = (event: StreamReadyEvent): void => {
    if (event.detail && videoRef.current) {
      videoRef.current.srcObject = event.detail;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play().catch(console.error);
      };
    } else {
      console.error('Stream is not available');
    }
  };

  // Handle stream disconnection
  const handleStreamDisconnected = (): void => {
    console.log('Stream disconnected');
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsSessionActive(false);
  };

  // Initialize streaming avatar session
  const initializeAvatarSession = async (): Promise<void> => {
    try {
      const token = await fetchAccessToken();
      const newAvatar = new StreamingAvatar({ token });
      
      const newSessionData = await newAvatar.createStartAvatar({
        quality: AvatarQuality.High,
        avatarName: 'Dexter_Doctor_Sitting2_public',
      });

      console.log('Session data:', newSessionData);
      
      newAvatar.on(StreamingEvents.STREAM_READY, handleStreamReady as EventListener);
      newAvatar.on(StreamingEvents.STREAM_DISCONNECTED, handleStreamDisconnected);

      setAvatar(newAvatar);
      setSessionData(newSessionData);
      setIsSessionActive(true);
    } catch (error) {
      console.error('Failed to initialize avatar session:', error);
    }
  };

  // End the avatar session
  const terminateAvatarSession = async (): Promise<void> => {
    if (!avatar || !sessionData) return;
    
    try {
      await avatar.stopAvatar();
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setAvatar(null);
      setSessionData(null);
      setIsSessionActive(false);
    } catch (error) {
      console.error('Failed to terminate avatar session:', error);
    }
  };

  // Initialize avatar session automatically when component mounts
  useEffect(() => {
    initializeAvatarSession().catch(console.error);
  }, []);

  // Speak text when textToSpeak prop changes
  useEffect(() => {
    if (avatar && textToSpeak && isSessionActive) {
      avatar.speak({
        text: textToSpeak,
      }).catch(console.error);
    }
  }, [textToSpeak, avatar, isSessionActive]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (avatar) {
        terminateAvatarSession().catch(console.error);
      }
    };
  }, [avatar]);

  return (
    <video
      ref={videoRef}
      className="w-full h-full border rounded-lg"
      playsInline
    />
  );
};

export default AvatarComponent;