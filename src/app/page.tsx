import Link from "next/link";
import { courses } from "@/lib/data";

export default function LandingPage() {
  const featuredCourses = courses.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-amber-200 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-orange-200 blur-3xl" />
        </div>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/80 px-4 py-1.5 text-xs font-medium text-stone-700 backdrop-blur">
            ✦ Mindfulness Training Platform
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-6xl">
            เส้นทางแห่งสติและปัญญา
            <br />
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              เริ่มต้นที่นี่
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-600 sm:text-xl">
            แพลตฟอร์มจัดการการอบรมด้านจิตวิทยาและการเจริญสติ
            สำหรับผู้สนใจพัฒนาตนเอง และก้าวสู่การเป็นสต๊าฟ
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-full bg-stone-900 px-8 py-3 text-base font-medium text-white transition hover:bg-stone-700"
            >
              ดูหลักสูตรทั้งหมด →
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-8 py-3 text-base font-medium text-stone-900 transition hover:bg-stone-100"
            >
              เรียนรู้เพิ่มเติม
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-stone-200 bg-white py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
          {[
            { value: "2,000+", label: "ผู้ผ่านการอบรม" },
            { value: "15+", label: "หลักสูตร" },
            { value: "50+", label: "สต๊าฟ" },
            { value: "8 ปี", label: "ประสบการณ์" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-semibold text-stone-900 sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-stone-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
              ระบบที่ออกแบบมาเพื่อทุกคน
            </h2>
            <p className="mt-4 text-lg text-stone-600">
              ตั้งแต่ผู้เริ่มต้น จนถึงสต๊าฟระดับผู้นำ
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: "🎓",
                title: "หลักสูตรหลากหลาย",
                desc: "Mix & Match เนื้อหา เลือกเรียนตามระดับและความสนใจ",
              },
              {
                icon: "👥",
                title: "ยกระดับสู่สต๊าฟ",
                desc: "เส้นทางพัฒนาที่ชัดเจน จากผู้เรียน → Trainee → Staff",
              },
              {
                icon: "📊",
                title: "ติดตามผลครบวงจร",
                desc: "Transcript, Certificate, และประวัติการอบรมของคุณ",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-stone-200 bg-white p-6 transition hover:border-stone-300 hover:shadow-sm"
              >
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-4 text-lg font-semibold text-stone-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-stone-100 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
                หลักสูตรแนะนำ
              </h2>
              <p className="mt-2 text-stone-600">
                หลักสูตรที่เปิดรับสมัครในช่วงนี้
              </p>
            </div>
            <Link
              href="/courses"
              className="hidden text-sm font-medium text-stone-700 hover:text-stone-900 sm:block"
            >
              ดูทั้งหมด →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {featuredCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:shadow-md"
              >
                <div className={`h-32 bg-gradient-to-br ${course.gradient}`} />
                <div className="p-5">
                  <h3 className="font-semibold text-stone-900 group-hover:text-stone-700">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-stone-600">
                    {course.tagline}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
                    <span>{course.durationDays} วัน</span>
                    <span className="font-semibold text-stone-900">
                      {course.price === 0
                        ? "ฟรี"
                        : `฿${course.price.toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/courses" className="text-sm font-medium text-stone-700">
              ดูทั้งหมด →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
            พร้อมเริ่มต้นแล้วหรือยัง?
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            เลือกหลักสูตรที่เหมาะกับคุณ และเริ่มต้นเส้นทางแห่งสติวันนี้
          </p>
          <Link
            href="/courses"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3 text-base font-medium text-white transition hover:opacity-90"
          >
            ดูหลักสูตรทั้งหมด →
          </Link>
        </div>
      </section>
    </div>
  );
}
