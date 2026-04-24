import Link from "next/link";
import { getCourse } from "@/lib/data";

export default async function EnrolledPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string; name?: string }>;
}) {
  const { course: slug, name } = await searchParams;
  const course = slug ? getCourse(slug) : undefined;

  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <div className="mb-6 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-4xl text-white shadow-lg">
          ✓
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-stone-900 sm:text-3xl">
        ส่งใบสมัครเรียบร้อยแล้ว!
      </h1>

      {name && (
        <p className="mt-3 text-stone-600">
          ขอบคุณ <span className="font-medium text-stone-900">{name}</span>{" "}
          ที่สนใจเข้าร่วมการอบรม
        </p>
      )}

      {course && (
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 text-left shadow-sm">
          <div className={`-mx-5 -mt-5 h-20 rounded-t-2xl bg-gradient-to-br ${course.gradient}`} />
          <div className="mt-4">
            <h2 className="font-semibold text-stone-900">{course.title}</h2>
            <p className="mt-1 text-sm text-stone-500">{course.tagline}</p>
            <div className="mt-3 space-y-1 text-sm text-stone-600">
              <p>📅 {course.startDate}</p>
              <p>📍 {course.location}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
        <p className="font-medium">ขั้นตอนถัดไป</p>
        <p className="mt-1 leading-relaxed">
          ทีมงาน Enlight จะติดต่อกลับเพื่อยืนยันและแจ้งรายละเอียดการชำระเงินภายใน 1-2 วันทำการ
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/courses"
          className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-stone-100"
        >
          ดูหลักสูตรอื่น
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
        >
          กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}
