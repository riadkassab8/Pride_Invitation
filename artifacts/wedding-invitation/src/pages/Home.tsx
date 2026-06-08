import { useState } from "react";
import { EnvelopeScreen } from "@/components/EnvelopeScreen";
import { InvitationCard } from "@/components/InvitationCard";
import { GoldParticles } from "@/components/GoldParticles";
import { useAudio } from "@/hooks/useAudio";
import { Volume2, VolumeX } from "lucide-react";

export default function Home() {
  const [appState, setAppState] = useState<"envelope" | "zooming" | "invitation">("envelope");
  const { play, toggleMute, isMuted } = useAudio("/audio/main.mp3");

  const playWaxSealCrack = () => {
    const ctx = new AudioContext();
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    noise.connect(gainNode);
    gainNode.connect(ctx.destination);
    noise.start();
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.frequency.value = 150;
    oscGain.gain.setValueAtTime(0.3, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  };

  const handleOpen = () => {
    if (appState !== "envelope") return;
    playWaxSealCrack();
    setAppState("zooming");
    setTimeout(() => setAppState("invitation"), 1000);
    setTimeout(() => play(), 1200);
  };

  return (
    <main
      className="min-h-screen w-full overflow-hidden relative"
      style={{
        background: "linear-gradient(180deg, #04111f 0%, #072840 18%, #0a3d62 38%, #1a6a8a 55%, #1a8080 70%, #2a9090 80%, #b8956a 90%, #d4b896 100%)",
      }}
    >
      {appState === "envelope" || appState === "zooming" ? (
        <EnvelopeScreen onOpen={handleOpen} isZooming={appState === "zooming"} />
      ) : null}

      {appState === "invitation" && (
        <div
          className="absolute inset-0 animate-in fade-in duration-400"
          style={{
            background: "linear-gradient(160deg, #030d1a 0%, #061828 30%, #0a2a40 60%, #0d3a50 100%)",
          }}
        >
          <GoldParticles />
          <InvitationCard />

          <button
            onClick={toggleMute}
            data-testid="button-mute"
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-[#0a2840]/80 border border-[#c9a84c]/30 text-[#c9a84c] hover:bg-[#1a4060]/80 transition-colors"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      )}
    </main>
  );
}
