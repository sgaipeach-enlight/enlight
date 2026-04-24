import Link from "next/link";
import { courses } from "@/lib/data";

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          หลักสูตรทั้งหมด
        </h1>
        <p className="mt-2 text-stone-600">
          เลือกหลักสูตรที่เหมาะกับคุณ — มีตั้งแต่ระดับเริ่มต้นจนถึงระดับสต๊าฟ
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const spotsLeft = course.capacity - course.enrolled;
          const almostFull = spotsLeft <= 5;

          return (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:shadow-lg"
            >
              <div
                className={`relative h-40 bg-gradient-to-br ${course.gradient}`}
              >
                <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                  {course.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-stone-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {almostFull && (
                  <span className="absolute right-4 top-4 rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-medium text-white">
                    ใกล้เต็ม
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-stone-900 group-hover:text-stone-700">
                  {course.title}
                </h3>
                <p className="mt-1 text-sm text-stone-500">{course.tagline}</p>
                <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-stone-600">
                  {course.description}
                </p>
                <div className="mt-4 space-y-2 border-t border-stone-100 pt-4 text-xs text-stone-500">
                  <div className="flex items-center justify-between">
                    <span>📅 {course.startDate}</span>
                    <span>⏱ {course.durationDays} วัน</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="line-clamp-1">📍 {course.location}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-stone-600">
                      {spotsLeft}/{course.capacity} ที่นั่งคงเหลือ
                    </span>
                    <span className="text-base font-semibold text-stone-900">
                      {course.price === 0
                        ? "ฟรี"
                        : `฿${course.price.toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
