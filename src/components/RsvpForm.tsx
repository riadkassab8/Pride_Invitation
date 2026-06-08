import { useState } from "react";
import { useSubmitRsvp } from "@workspace/api-client-react";

type AttendingValue = "yes" | "no" | "maybe";

export function RsvpForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<AttendingValue>("yes");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const mutation = useSubmitRsvp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim()) {
      setError("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    mutation.mutate(
      { data: { name: name.trim(), phone: phone.trim(), attending, guests, message: message.trim() || undefined } },
      {
        onSuccess: () => setSubmitted(true),
        onError: () => setError("حدث خطأ، يرجى المحاولة مرة أخرى"),
      }
    );
  };

  if (submitted) {
    return (
      <div
        className="mt-8 w-full text-center py-6 px-4 border border-[#c9a84c]/40 rounded"
        data-testid="rsvp-success"
      >
        <div className="text-[#c9a84c] font-serif text-xl mb-2">شكراً لك!</div>
        <div className="text-[#5a4a2a] font-sans text-sm" dir="rtl">
          تم تأكيد ردك، نراكم قريباً إن شاء الله
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 w-full">
      <div className="flex items-center w-full justify-center mb-5">
        <div className="h-px w-12 bg-[#c9a84c]/40" />
        <span className="mx-3 text-[#c9a84c] font-sans tracking-[0.2em] text-[11px] uppercase">
          تأكيد الحضور
        </span>
        <div className="h-px w-12 bg-[#c9a84c]/40" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full" data-testid="rsvp-form">
        <input
          type="text"
          placeholder="الاسم الكامل *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          dir="rtl"
          data-testid="input-name"
          className="w-full bg-transparent border border-[#c9a84c]/40 rounded px-3 py-2 text-[#5a4a2a] font-sans text-sm placeholder-[#c9a84c]/50 focus:outline-none focus:border-[#c9a84c] transition-colors"
        />

        <input
          type="tel"
          placeholder="رقم الهاتف *"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          dir="rtl"
          data-testid="input-phone"
          className="w-full bg-transparent border border-[#c9a84c]/40 rounded px-3 py-2 text-[#5a4a2a] font-sans text-sm placeholder-[#c9a84c]/50 focus:outline-none focus:border-[#c9a84c] transition-colors"
        />

        <div className="flex gap-2 w-full" dir="rtl">
          {(["yes", "no", "maybe"] as AttendingValue[]).map((val) => {
            const labels: Record<AttendingValue, string> = {
              yes: "سأحضر",
              no: "لن أتمكن",
              maybe: "ربما",
            };
            return (
              <button
                key={val}
                type="button"
                onClick={() => setAttending(val)}
                data-testid={`button-attending-${val}`}
                className={`flex-1 py-2 text-sm font-sans border rounded transition-all duration-200 ${
                  attending === val
                    ? "bg-[#c9a84c] border-[#c9a84c] text-[#1a1208]"
                    : "bg-transparent border-[#c9a84c]/40 text-[#5a4a2a] hover:border-[#c9a84c]"
                }`}
              >
                {labels[val]}
              </button>
            );
          })}
        </div>

        {attending === "yes" || attending === "maybe" ? (
          <div className="flex items-center gap-3" dir="rtl">
            <label className="text-[#5a4a2a] font-sans text-sm whitespace-nowrap">عدد الأفراد:</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                data-testid="button-guests-dec"
                className="w-7 h-7 border border-[#c9a84c]/40 text-[#c9a84c] rounded hover:border-[#c9a84c] transition-colors text-lg leading-none"
              >
                −
              </button>
              <span className="text-[#5a4a2a] font-serif text-lg w-6 text-center" data-testid="text-guests">
                {guests}
              </span>
              <button
                type="button"
                onClick={() => setGuests(Math.min(20, guests + 1))}
                data-testid="button-guests-inc"
                className="w-7 h-7 border border-[#c9a84c]/40 text-[#c9a84c] rounded hover:border-[#c9a84c] transition-colors text-lg leading-none"
              >
                +
              </button>
            </div>
          </div>
        ) : null}

        <textarea
          placeholder="رسالة للعروسين (اختياري)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          dir="rtl"
          data-testid="input-message"
          className="w-full bg-transparent border border-[#c9a84c]/40 rounded px-3 py-2 text-[#5a4a2a] font-sans text-sm placeholder-[#c9a84c]/50 focus:outline-none focus:border-[#c9a84c] transition-colors resize-none"
        />

        {error && (
          <div className="text-red-600 text-sm font-sans text-center" dir="rtl" data-testid="text-error">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          data-testid="button-submit-rsvp"
          className="w-full py-2.5 border border-[#c9a84c] text-[#c9a84c] font-sans text-sm tracking-wider hover:bg-[#c9a84c] hover:text-[#1a1208] transition-all duration-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "جاري الإرسال..." : "تأكيد الحضور"}
        </button>
      </form>
    </div>
  );
}
