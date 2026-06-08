import { motion } from "framer-motion";
import { CountdownTimer } from "./CountdownTimer";
import { RsvpForm } from "./RsvpForm";

export function InvitationCard() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-10 px-4 w-full">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
        className="relative bg-[#f9f3e3] rounded-lg border border-[#c9a84c]/40 w-full max-w-[380px] sm:max-w-[460px] p-8 sm:p-10 shadow-2xl overflow-hidden flex flex-col items-center text-center"
      >
        {/* Ornaments */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t border-l border-[#c9a84c] rounded-tl" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-[#c9a84c] rounded-tr" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-[#c9a84c] rounded-bl" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b border-r border-[#c9a84c] rounded-br" />

        <div className="text-[#c9a84c] font-sans tracking-[0.3em] text-[11px] mb-4 uppercase">
          YOU ARE INVITED
        </div>

        <div className="flex items-center w-full justify-center mb-6">
          <div className="h-px w-16 bg-[#c9a84c]/50" />
          <div className="w-2 h-2 rotate-45 border border-[#c9a84c] mx-2" />
          <div className="h-px w-16 bg-[#c9a84c]/50" />
        </div>

        <div className="w-[90px] h-[90px] rounded-full border-2 border-[#c9a84c] flex items-center justify-center mb-6 shrink-0">
          <span className="font-serif text-2xl text-[#c9a84c]">A & Y</span>
        </div>

        <div className="font-sans text-[#5a4a2a] text-lg mb-4" dir="rtl">
          يسعدنا دعوتكم لحضور حفل زفاف
        </div>

        <div className="font-serif text-[#c9a84c] text-3xl sm:text-4xl mb-6">
          أحمد & يارا
        </div>

        <div className="flex items-center w-full justify-center mb-6">
          <div className="h-px w-20 bg-[#c9a84c]/30" />
        </div>

        <div className="font-sans text-[#5a4a2a] text-base mb-1" dir="rtl">
          الجمعة ٢٠ سبتمبر ٢٠٢٦
        </div>
        <div className="font-sans text-[#5a4a2a] text-base mb-6" dir="rtl">
          ٨ مساءً
        </div>

        <div className="font-sans font-bold text-[#c9a84c] text-lg mb-1" dir="rtl">
          قاعة نايل رينبو
        </div>
        <div className="font-sans text-[#c9a84c]/80 text-sm mb-6" dir="rtl">
          المعادي، القاهرة
        </div>

        <CountdownTimer />

        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-[280px]">
          <a
            href="https://www.google.com/calendar/render?action=TEMPLATE&text=حفل+زفاف+أحمد+و+يارا&dates=20260920T170000Z/20260921T000000Z&details=قاعة+نايل+رينبو,+المعادي+القاهرة"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-calendar"
            className="flex-1 py-2 px-4 border border-[#c9a84c] text-[#c9a84c] font-sans text-center transition-all duration-300 hover:bg-[#c9a84c] hover:text-[#1a1208]"
          >
            احفظ الموعد
          </a>
          <a
            href="https://www.google.com/maps/search/Nile+Rainbow+Hall+Maadi+Cairo"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-maps"
            className="flex-1 py-2 px-4 border border-[#c9a84c] text-[#c9a84c] font-sans text-center transition-all duration-300 hover:bg-[#c9a84c] hover:text-[#1a1208]"
          >
            خريطة القاعة
          </a>
        </div>

        <RsvpForm />
      </motion.div>
    </div>
  );
}
