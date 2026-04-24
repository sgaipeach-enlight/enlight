export type Course = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  durationDays: number;
  price: number;
  capacity: number;
  enrolled: number;
  startDate: string;
  location: string;
  instructor: string;
  tags: string[];
  gradient: string;
};

export type Enrollment = {
  id: string;
  courseSlug: string;
  name: string;
  phone: string;
  email: string;
  note?: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
};

export const courses: Course[] = [
  {
    slug: "mindfulness-foundation",
    title: "Mindfulness Foundation",
    tagline: "เริ่มต้นเส้นทางแห่งสติ",
    description:
      "หลักสูตรเบื้องต้นสำหรับผู้ที่ต้องการเรียนรู้การฝึกสติอย่างถูกวิธี เหมาะสำหรับผู้เริ่มต้น ครอบคลุมหลักการทำสมาธิ การเจริญสติในชีวิตประจำวัน และการจัดการอารมณ์",
    durationDays: 3,
    price: 2500,
    capacity: 40,
    enrolled: 28,
    startDate: "2026-05-15",
    location: "ศูนย์ปฏิบัติธรรม Enlight กรุงเทพฯ",
    instructor: "หลวงพี่ Sgaipeach",
    tags: ["Beginner", "Meditation", "Mindfulness"],
    gradient: "from-amber-400 to-orange-500",
  },
  {
    slug: "deep-retreat-7days",
    title: "Deep Retreat 7 Days",
    tagline: "ปฏิบัติเข้มข้น 7 วันเต็ม",
    description:
      "คอร์สปฏิบัติธรรมเข้มข้น 7 วัน ในสถานที่สงบท่ามกลางธรรมชาติ เน้นการเจริญสติและวิปัสสนาขั้นลึก สำหรับผู้ที่ผ่านหลักสูตรเบื้องต้นมาแล้ว",
    durationDays: 7,
    price: 8900,
    capacity: 25,
    enrolled: 22,
    startDate: "2026-06-10",
    location: "ศูนย์ปฏิบัติธรรม Enlight เชียงใหม่",
    instructor: "หลวงพี่ Sgaipeach",
    tags: ["Advanced", "Retreat", "Vipassana"],
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    slug: "mindful-leadership",
    title: "Mindful Leadership",
    tagline: "ผู้นำที่มีสติและปัญญา",
    description:
      "หลักสูตรสำหรับผู้บริหารและหัวหน้างาน ที่ต้องการนำหลักการเจริญสติมาประยุกต์ใช้ในการบริหารทีม การตัดสินใจ และการพัฒนาภาวะผู้นำอย่างยั่งยืน",
    durationDays: 2,
    price: 5500,
    capacity: 30,
    enrolled: 15,
    startDate: "2026-05-22",
    location: "โรงแรม Sukhothai Bangkok",
    instructor: "ทีมวิทยากร Enlight",
    tags: ["Leadership", "Corporate", "Executive"],
    gradient: "from-indigo-400 to-purple-600",
  },
  {
    slug: "staff-training-program",
    title: "Staff Training Program",
    tagline: "พัฒนาสู่การเป็นสต๊าฟ",
    description:
      "หลักสูตรพัฒนาผู้ผ่านการอบรมเบื้องต้น ยกระดับสู่การเป็นสต๊าฟ รวมถึงทักษะการสอน การจัดการ และจรรยาบรรณ สำหรับผู้ที่ผ่าน Mindfulness Foundation + Deep Retreat มาแล้ว",
    durationDays: 5,
    price: 0,
    capacity: 20,
    enrolled: 8,
    startDate: "2026-07-01",
    location: "ศูนย์ปฏิบัติธรรม Enlight กรุงเทพฯ",
    instructor: "ทีมอาจารย์ Enlight",
    tags: ["Staff Track", "Advanced", "Free"],
    gradient: "from-rose-400 to-pink-600",
  },
  {
    slug: "weekend-mini-retreat",
    title: "Weekend Mini Retreat",
    tagline: "พักใจสุดสัปดาห์",
    description:
      "คอร์สสุดสัปดาห์ 2 วัน 1 คืน สำหรับผู้ที่ต้องการพักผ่อนจิตใจ ชาร์จพลัง และเรียนรู้การเจริญสติขั้นพื้นฐาน เหมาะกับคนทำงานที่มีเวลาจำกัด",
    durationDays: 2,
    price: 1800,
    capacity: 35,
    enrolled: 20,
    startDate: "2026-05-08",
    location: "ศูนย์ปฏิบัติธรรม Enlight กาญจนบุรี",
    instructor: "หลวงพี่ Sgaipeach",
    tags: ["Weekend", "Beginner", "Short"],
    gradient: "from-sky-400 to-blue-600",
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export const sampleEnrollments: Enrollment[] = [
  {
    id: "ENR-2026-001",
    courseSlug: "mindfulness-foundation",
    name: "สมชาย ใจดี",
    phone: "081-234-5678",
    email: "somchai@example.com",
    note: "ไม่มีประสบการณ์มาก่อน อยากเริ่มเรียน",
    submittedAt: "2026-04-22T09:15:00Z",
    status: "approved",
  },
  {
    id: "ENR-2026-002",
    courseSlug: "deep-retreat-7days",
    name: "ปริยา สมใจ",
    phone: "089-876-5432",
    email: "priya@example.com",
    note: "ผ่าน Foundation มาแล้วปีที่แล้ว",
    submittedAt: "2026-04-23T14:30:00Z",
    status: "pending",
  },
  {
    id: "ENR-2026-003",
    courseSlug: "mindful-leadership",
    name: "Chayanin K.",
    phone: "092-111-2233",
    email: "chayanin.k@company.com",
    submittedAt: "2026-04-23T18:45:00Z",
    status: "pending",
  },
  {
    id: "ENR-2026-004",
    courseSlug: "weekend-mini-retreat",
    name: "วราภรณ์ ศรีสุข",
    phone: "086-555-9999",
    email: "waraphon@example.com",
    note: "แพ้ถั่วลิสง",
    submittedAt: "2026-04-24T08:20:00Z",
    status: "approved",
  },
];
