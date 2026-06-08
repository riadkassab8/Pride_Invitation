import { CandleFlame } from "./CandleFlame";
import envelopeImg from "/date_1780946050325.png";

interface EnvelopeScreenProps {
  onOpen: () => void;
  isZooming: boolean;
}

export function EnvelopeScreen({ onOpen, isZooming }: EnvelopeScreenProps) {
  return (
    <div
      className={`fixed inset-0 w-full h-full flex items-center justify-center ${isZooming ? "animate-zoom-in-blur pointer-events-none" : ""}`}
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Soft dark vignette so envelope pops */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      <div className="relative flex flex-col items-center justify-center z-10">
        {/* Envelope + candles */}
        <div className="relative">
          <div className="absolute -left-12 sm:-left-20 top-1/2 -translate-y-1/2">
            <CandleFlame />
          </div>
          <div className="absolute -right-12 sm:-right-20 top-1/2 -translate-y-1/2">
            <CandleFlame />
          </div>

          {/* The envelope IS the button */}
          <button
            onClick={onOpen}
            data-testid="button-envelope"
            className="relative block cursor-pointer group focus:outline-none"
            aria-label="افتح الدعوة"
          >
            <img
              src={envelopeImg}
              alt="Wedding Envelope"
              className="w-[300px] sm:w-[400px] object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              style={{
                filter: "drop-shadow(0 24px 60px rgba(0,0,0,0.55))",
              }}
            />
            {/* Subtle pulsing gold glow ring on hover hint */}
            <span className="absolute inset-0 rounded pointer-events-none animate-pulse-ring" />
          </button>
        </div>

        <div
          className="mt-8 text-[#f5e4b0] font-sans italic text-lg animate-fade-pulse text-center"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
        >
          اضغط على الظرف لفتح الدعوة
        </div>
      </div>
    </div>
  );
}
