import { useListRsvps } from "@workspace/api-client-react";

const ATTENDING_LABEL: Record<string, string> = {
  yes: "سيحضر",
  no: "لن يحضر",
  maybe: "ربما",
};

const ATTENDING_COLOR: Record<string, string> = {
  yes: "text-emerald-700 bg-emerald-50 border-emerald-200",
  no: "text-red-700 bg-red-50 border-red-200",
  maybe: "text-amber-700 bg-amber-50 border-amber-200",
};

export default function Admin() {
  const { data: rsvps, isLoading, error } = useListRsvps();

  const attending = rsvps?.filter((r) => r.attending === "yes") ?? [];
  const notAttending = rsvps?.filter((r) => r.attending === "no") ?? [];
  const maybe = rsvps?.filter((r) => r.attending === "maybe") ?? [];
  const totalGuests = attending.reduce((sum, r) => sum + r.guests, 0)
    + maybe.reduce((sum, r) => sum + r.guests, 0);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-[#f9f3e3] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-[#c9a84c] font-sans tracking-[0.3em] text-xs uppercase mb-2">
            لوحة الإدارة
          </div>
          <h1 className="font-serif text-3xl text-[#f9f3e3]">ردود الدعوة</h1>
          <div className="h-px w-24 bg-[#c9a84c]/40 mx-auto mt-4" />
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { label: "إجمالي الردود", value: rsvps?.length ?? 0, color: "text-[#c9a84c]" },
            { label: "سيحضرون", value: attending.length, color: "text-emerald-400" },
            { label: "لن يحضروا", value: notAttending.length, color: "text-red-400" },
            { label: "إجمالي الضيوف", value: totalGuests, color: "text-amber-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#1a1208]/60 border border-[#c9a84c]/20 rounded p-4 text-center"
              data-testid={`stat-${stat.label}`}
            >
              <div className={`font-serif text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-[#c9a84c]/70 font-sans text-xs mt-1" dir="rtl">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        {isLoading && (
          <div className="text-center text-[#c9a84c]/60 font-sans py-10" data-testid="loading-rsvps">
            جارٍ التحميل...
          </div>
        )}
        {error && (
          <div className="text-center text-red-400 font-sans py-10" data-testid="error-rsvps">
            تعذّر تحميل البيانات
          </div>
        )}
        {rsvps && rsvps.length === 0 && (
          <div className="text-center text-[#c9a84c]/50 font-sans py-10" data-testid="empty-rsvps">
            لا توجد ردود بعد
          </div>
        )}
        {rsvps && rsvps.length > 0 && (
          <div className="overflow-x-auto rounded border border-[#c9a84c]/20">
            <table className="w-full text-sm font-sans" data-testid="table-rsvps">
              <thead>
                <tr className="border-b border-[#c9a84c]/20 bg-[#1a1208]/40">
                  <th className="py-3 px-4 text-right text-[#c9a84c]/80 font-normal tracking-wider text-xs" dir="rtl">الاسم</th>
                  <th className="py-3 px-4 text-right text-[#c9a84c]/80 font-normal tracking-wider text-xs" dir="rtl">الهاتف</th>
                  <th className="py-3 px-4 text-center text-[#c9a84c]/80 font-normal tracking-wider text-xs">الحضور</th>
                  <th className="py-3 px-4 text-center text-[#c9a84c]/80 font-normal tracking-wider text-xs">الأفراد</th>
                  <th className="py-3 px-4 text-right text-[#c9a84c]/80 font-normal tracking-wider text-xs" dir="rtl">رسالة</th>
                  <th className="py-3 px-4 text-center text-[#c9a84c]/80 font-normal tracking-wider text-xs">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((rsvp, i) => (
                  <tr
                    key={rsvp.id}
                    className={`border-b border-[#c9a84c]/10 transition-colors hover:bg-[#c9a84c]/5 ${i % 2 === 0 ? "bg-transparent" : "bg-[#1a1208]/20"}`}
                    data-testid={`row-rsvp-${rsvp.id}`}
                  >
                    <td className="py-3 px-4 text-[#f9f3e3] text-right" dir="rtl">{rsvp.name}</td>
                    <td className="py-3 px-4 text-[#c9a84c]/80 text-right" dir="rtl">{rsvp.phone}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded border text-xs font-medium ${ATTENDING_COLOR[rsvp.attending] ?? "text-gray-600 bg-gray-50 border-gray-200"}`}
                        dir="rtl"
                      >
                        {ATTENDING_LABEL[rsvp.attending] ?? rsvp.attending}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#c9a84c] text-center font-serif">{rsvp.guests}</td>
                    <td className="py-3 px-4 text-[#f9f3e3]/60 text-right max-w-[140px] truncate" dir="rtl">
                      {rsvp.message ?? "—"}
                    </td>
                    <td className="py-3 px-4 text-[#c9a84c]/60 text-center text-xs whitespace-nowrap">
                      {new Date(rsvp.createdAt).toLocaleDateString("ar-EG")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="text-center mt-10">
          <a
            href="/"
            className="text-[#c9a84c]/60 font-sans text-xs tracking-wider hover:text-[#c9a84c] transition-colors"
            data-testid="link-back"
          >
            ← العودة للدعوة
          </a>
        </div>
      </div>
    </div>
  );
}
