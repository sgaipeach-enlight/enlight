import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getCourse } from "@/lib/data";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) notFound();

  const spotsLeft = course.capacity - course.enrolled;
  const isFull = spotsLeft <= 0;

  async function enroll(formData: FormData) {
    "use server";
    const name = (formData.get("name") as string).trim();
    const phone = (formData.get("phone") as string).trim();
    const email = (formData.get("email") as string).trim();
    if (!name || !phone || !email) return;
    redirect(
      `/enrolled?course=${slug}&name=${encodeURIComponent(name)}`
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <Link
        href="/courses"
        className="mb-8 inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700"
      >
        ← กลับไปหลักสูตรทั้งหมด
      </Link>

      {/* Header */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${course.gradient} p-8 text-white`}>
        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-semibold sm:text-4xl">{course.title}</h1>
        <p className="mt-2 text-lg opacity-90">{course.tagline}</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">รายละเอียดหลักสูตร</h2>
            <p className="mt-3 leading-relaxed text-stone-600">{course.description}</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
            <h3 className="font-semibold text-stone-900">ข้อมูลการอบรม</h3>
            <div className="grid gap-3 text-sm text-stone-600 sm:grid-cols-2">
              <div>
                <span className="font-medium text-stone-700">วิทยากร</span>
                <p className="mt-0.5">{course.instructor}</p>
              </div>
              <div>
                <span className="font-medium text-stone-700">วันที่เริ่ม</span>
                <p className="mt-0.5">{course.startDate}</p>
              </div>
              <div>
                <span className="font-medium text-stone-700">ระยะเวลา</span>
                <p className="mt-0.5">{course.durationDays} วัน</p>
              </div>
              <div>
                <span className="font-medium text-stone-700">สถานที่</span>
                <p className="mt-0.5">{course.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Price + Form */}
        <div className="space-y-4">
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="text-3xl font-semibold text-stone-900">
              {course.price === 0 ? "ฟรี" : `฿${course.price.toLocaleString()}`}
            </div>
            <div className="mt-2 text-sm text-stone-500">
              {spotsLeft} / {course.capacity} ที่นั่งคงเหลือ
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-stone-100">
              <div
                className="h-full rounded-full bg-amber-400"
                style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
              />
            </div>
          </div>

          {isFull ? (
            <div className="rounded-xl bg-stone-100 p-5 text-center text-sm text-stone-500">
              หลักสูตรนี้เต็มแล้ว
            </div>
          ) : (
            <form
              action={enroll}
              className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm space-y-4"
            >
              <h3 className="font-semibold text-stone-900">สมัครเข้าร่วม</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    ชื่อ-นามสกุล <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    required
                    type="text"
                    placeholder="สมชาย ใจดี"
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phone"
                    required
                    type="tel"
                    placeholder="081-234-5678"
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    อีเมล <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="somchai@example.com"
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    หมายเหตุ (ถ้ามี)
                  </label>
                  <textarea
                    name="note"
                    rows={2}
                    placeholder="แพ้อาหาร ข้อจำกัดด้านสุขภาพ ฯลฯ"
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-stone-900 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                ยืนยันการสมัคร →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
