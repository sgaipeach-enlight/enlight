import { sampleEnrollments, getCourse } from "@/lib/data";

const statusLabel: Record<string, string> = {
  pending: "รอดำเนินการ",
  approved: "อนุมัติแล้ว",
  rejected: "ปฏิเสธ",
};

const statusStyle: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminPage() {
  const pending = sampleEnrollments.filter((e) => e.status === "pending").length;
  const approved = sampleEnrollments.filter((e) => e.status === "approved").length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-stone-900 sm:text-3xl">
          Admin — จัดการการสมัคร
        </h1>
        <p className="mt-1 text-sm text-stone-500">POC Mockup — ข้อมูลจำลอง</p>
      </div>

      {/* Summary */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "ใบสมัครทั้งหมด", value: sampleEnrollments.length, color: "text-stone-900" },
          { label: "รอดำเนินการ", value: pending, color: "text-amber-600" },
          { label: "อนุมัติแล้ว", value: approved, color: "text-green-600" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <div className={`text-3xl font-semibold ${s.color}`}>{s.value}</div>
            <div className="mt-1 text-sm text-stone-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-left">
                <th className="px-5 py-3 font-medium text-stone-600">รหัส</th>
                <th className="px-5 py-3 font-medium text-stone-600">ชื่อ</th>
                <th className="px-5 py-3 font-medium text-stone-600">หลักสูตร</th>
                <th className="px-5 py-3 font-medium text-stone-600">เบอร์ / อีเมล</th>
                <th className="px-5 py-3 font-medium text-stone-600">วันที่สมัคร</th>
                <th className="px-5 py-3 font-medium text-stone-600">สถานะ</th>
                <th className="px-5 py-3 font-medium text-stone-600">หมายเหตุ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {sampleEnrollments.map((enrollment) => {
                const course = getCourse(enrollment.courseSlug);
                return (
                  <tr key={enrollment.id} className="hover:bg-stone-50">
                    <td className="px-5 py-4 font-mono text-xs text-stone-500">
                      {enrollment.id}
                    </td>
                    <td className="px-5 py-4 font-medium text-stone-900">
                      {enrollment.name}
                    </td>
                    <td className="px-5 py-4">
                      {course ? (
                        <div>
                          <div className="font-medium text-stone-800">{course.title}</div>
                          <div className="text-xs text-stone-400">{course.startDate}</div>
                        </div>
                      ) : (
                        <span className="text-stone-400">{enrollment.courseSlug}</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-stone-600">
                      <div>{enrollment.phone}</div>
                      <div className="text-xs text-stone-400">{enrollment.email}</div>
                    </td>
                    <td className="px-5 py-4 text-stone-500 text-xs">
                      {new Date(enrollment.submittedAt).toLocaleDateString("th-TH", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle[enrollment.status]}`}
                      >
                        {statusLabel[enrollment.status]}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-stone-500 max-w-[160px]">
                      <span className="line-clamp-2 text-xs">
                        {enrollment.note ?? "—"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
