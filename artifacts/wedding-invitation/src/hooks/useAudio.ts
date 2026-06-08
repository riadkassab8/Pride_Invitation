import { useState, useRef } from "react";

export function useAudio(url: string) {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getOrCreateAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio(url);
      audio.loop = true;
      audio.volume = 0.9;
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  const play = () => {
    const audio = getOrCreateAudio();
    audio.load();
    audio.currentTime = 105; // Start from minute 1:45
    const tryPlay = () => {
      audio.play().catch(() => {
        setTimeout(() => {
          audio.play().catch(() => {});
        }, 500);
      });
    };
    if (audio.readyState >= 2) {
      tryPlay();
    } else {
      audio.addEventListener("canplay", tryPlay, { once: true });
    }
  };

  const toggleMute = () => {
    const audio = getOrCreateAudio();
    const next = !isMuted;
    audio.muted = next;
    setIsMuted(next);
  };

  return { play, toggleMute, isMuted };
}
