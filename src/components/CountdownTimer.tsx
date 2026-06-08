import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Sept 20, 2026 20:00 Cairo (UTC+3)
    // Create UTC date, then subtract 3 hours to get equivalent in local timezone assuming it runs anywhere.
    // Or simply specify it explicitly with offset
    const targetDate = new Date("2026-09-20T20:00:00+03:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const Box = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center justify-center bg-[#1a1208] border border-[#c9a84c]/30 rounded p-2 w-16 sm:w-20">
      <span className="font-serif text-2xl sm:text-3xl text-[#c9a84c]">{value.toString().padStart(2, "0")}</span>
      <span className="font-sans text-[10px] tracking-widest text-[#c9a84c]/80 mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-2 sm:gap-4 justify-center my-6" dir="rtl">
      <Box value={timeLeft.days} label="أيام" />
      <Box value={timeLeft.hours} label="ساعات" />
      <Box value={timeLeft.minutes} label="دقائق" />
      <Box value={timeLeft.seconds} label="ثواني" />
    </div>
  );
}
