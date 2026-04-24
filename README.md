# 🧘 Enlight Training & Staff Management System

> **Repository:** `git@github.com:sgaipeach-enlight/enlight.git`

---

## 🌟 ภาพรวมระบบ

**Program จัดการฐานข้อมูลการจัดอบรม** — ฐานข้อมูลที่ใช้จัดอบรมและติดตามต่อ นำไปสู่การยกระดับในการเป็นสต๊าฟ

- มี **ฐานข้อมูลเบื้องหลัง** สำหรับเจ้าหน้าที่ว่าใครเป็นคนรับผิดชอบต่างๆ
- มี **ฐานข้อมูลหลักสูตร** ที่แยกเป็นส่วนๆ ยกระดับเป็นระบบที่ **แยกย่อยและ Mix & Match ได้** (ในหลักสูตรมีเนื้อหาอะไรบ้าง เวลาเท่าไหร่ กิจกรรมอะไร)
- มี **ระบบการสมัคร + ระบบเรียนรู้ออนไลน์**
- มี **ระบบสมาชิก** และ **ระบบสมัครอบรมโดยไม่ใช่สมาชิก**
- มี **ระบบสต๊าฟ** และ **ระบบแอดมิน**
- มี **ระบบหลังบ้าน** — จัดซื้อ จัดอบรมทั้งหมด

### รายละเอียดระบบโดยย่อ

| ส่วน | รายละเอียด |
|------|-----------|
| 🏠 หน้าแรก | ข้อมูลองค์กร + หลักสูตร + ข่าวสาร |
| 👤 สมัครสมาชิก | สมัคร, ยืนยันตัวตน, จัดการโปรไฟล์ |
| 📝 สมัครอบรม | ฟอร์มเดียวรองรับทุกประเภทกิจกรรม |
| 📊 ติดตามผล | Progress tracking + Transcript |
| 🎓 เรียนออนไลน์ | Video + Quiz + Progress |
| 👷 สต๊าฟ | จัดทีม + จับคู่งาน + ยกระดับ Trainee → Staff |
| 🔧 แอดมิน | จัดการหลักสูตร, ผู้ใช้, การเงิน |
| 📦 ERP หลังบ้าน | จัดซื้อ, งบประมาณ, Logistics |
| 🗄️ Database Mgmt | ผู้ใช้, หลักสูตร, การอบรม, อื่นๆ |

---

## ✅ Decisions สรุป

| หัวข้อ | เลือกแล้ว |
|--------|-----------|
| **Tech Stack** | Next.js 15 + TypeScript + PostgreSQL + Prisma |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Hosting** | **Cloudflare Pages** (ฟรี) + **Neon** (Postgres ฟรี) + **Cloudflare R2** (files) |
| **ภาษา** | **ไทย + อังกฤษ** (i18n, next-intl) |
| **Auth** | Phone + SMS OTP (passwordless) + optional PIN 6 หลัก |
| **Payment** | PromptPay + upload สลิป + manual approve |
| **Video** | **YouTube Unlisted** (เริ่ม) → Cloudflare Stream (future ถ้าต้องการ protection) |
| **Certificate** | **PDF + QR code verify** |
| **Notifications** | **LINE OA Messaging API** |
| **Matching** | Weighted Scoring (Rule-based) → ML ภายหลัง |
| **Team** | เริ่ม 2 คน (หลวงพี่ + น้อง) → ขยายทีมภายหลัง |
| **Data Migration** | จาก Airtable (ทำภายหลัง, เริ่มจากร่างก่อน) |
| **Deadline** | จะคุยกันเพิ่มเติม |

---

## 🛠️ Tech Stack (รายละเอียด)

| Layer | เทคโนโลยี |
|-------|----------|
| Frontend + Backend | **Next.js 15** (App Router) |
| Language | **TypeScript** |
| i18n | **next-intl** (ไทย + อังกฤษ) |
| Database | **PostgreSQL** on **Neon** (serverless, ฟรี tier) |
| ORM | **Prisma** (ใช้ Neon adapter สำหรับ Cloudflare Pages) |
| Styling | **Tailwind CSS + shadcn/ui** |
| Auth | Phone + SMS OTP + PIN (optional) |
| Video | YouTube Unlisted (เริ่ม) / Cloudflare Stream (upgrade) |
| Payment | PromptPay + Slip upload |
| File Storage | **Cloudflare R2** |
| Hosting | **Cloudflare Pages** (`@cloudflare/next-on-pages`) |
| DNS/CDN | Cloudflare (มีอยู่แล้ว) |
| Notifications | **LINE OA** (Messaging API) + Email |
| Certificate | PDF generation (react-pdf) + QR (qrcode) |

### 📹 Video Hosting Strategy

**Phase 1 (ตอนนี้):** YouTube Unlisted
- ✅ ฟรี
- ✅ เสถียร โหลดเร็ว
- ⚠️ ไม่ป้องกันการโหลด/ก็อป (แต่ unlisted = ลิงก์ไม่ public)

**Phase 2 (อนาคต):** Cloudflare Stream (เมื่อต้องการ protection)
- ✅ อยู่ระบบ Cloudflare เดียวกัน
- ✅ Signed URL + Watermark + Domain lock
- ✅ จ่ายตามใช้จริง ~$5/1000 นาทีที่ดู
- ⚠️ ย้ายจาก YouTube มาภายหลังได้ (เปลี่ยนแค่ player component)

---

## 🏛️ Architecture Strategy: "Incremental Features, Holistic Schema"

- 🏗️ **DB Schema ครบทุก Phase ตั้งแต่ Day 1** (รวม ERP ด้วย)
- 🚀 **Implement Feature ทีละส่วน** แบ่งเป็น 3 Releases
- 🔄 ทำไปแก้ไปได้ เพราะ foundation มั่นคง — ไม่ต้อง migrate ใหญ่ระหว่างทาง

---

## 💡 Database Schema

### 1. Core Tables

```
Users
  id                  BIGSERIAL PK        -- internal, ไม่เปลี่ยน
  phone               TEXT UNIQUE         -- login identifier (เปลี่ยนได้)
  name                TEXT
  pin_hash            TEXT (nullable)     -- PIN 6 หลัก (optional)
  role_id             FK → Roles.id
  status              enum: pending | active | suspended
  locale              enum: th | en       -- ภาษาที่เลือก
  pdpa_consent_at     TIMESTAMPTZ         -- timestamp ยินยอม PDPA
  created_at, updated_at

User_Profiles
  user_id             PK/FK → Users.id
  line_id             TEXT
  address             TEXT
  mbti                TEXT
  enneagram           TEXT
  medical_condition   TEXT  (encrypted - pgcrypto)
  allergy             TEXT  (encrypted)
  transport_need      TEXT
  metadata            JSONB   -- ข้อมูลเพิ่มเติม

Roles
  id, name (Guest|Member|Trainee|Staff|Admin), permissions JSONB

Activities
  id                  BIGSERIAL PK
  title_th            TEXT
  title_en            TEXT
  type                enum: course | seminar | meeting | staff_call
  description_th      TEXT
  description_en      TEXT
  status              enum: draft | published | closed | archived
  metadata            JSONB   -- schedule, location, price, capacity
  created_at, updated_at

Modules
  id                  BIGSERIAL PK
  title_th            TEXT
  title_en            TEXT
  type                enum: video | quiz | reading | offline_session
  duration_min        INT
  content             JSONB   -- video_id (YouTube), quiz_questions, etc.
```

### 2. Relational / Pivot Tables

```
Activity_Modules              -- Mix & Match
  activity_id, module_id, order_sequence
  PK (activity_id, module_id)

Course_Prerequisites          -- Graph/DAG with AND/OR
  id
  course_id                   FK → Activities.id
  required_course_id          FK → Activities.id
  group_id                    INT    -- courses in same group = OR logic
  logic                       enum: AND | OR

Enrollments                   -- หัวใจหลัก ยุบรวมทุกประเภทการสมัคร
  id
  user_id                     FK → Users.id
  activity_id                 FK → Activities.id
  registered_by               FK → Users.id   -- สำหรับ delegate/group reg
  status                      enum: pending | approved | rejected | cancelled | completed
  payment_status              enum: unpaid | pending_verify | paid | refunded | waived
  metadata                    JSONB   -- slip URL, dietary override, etc.
  created_at, updated_at
  UNIQUE (user_id, activity_id)

Staff_Assignments
  activity_id, user_id, role_in_activity, rating, notes
  PK (activity_id, user_id)

Module_Progress
  user_id, module_id, status, completed_at, score
  PK (user_id, module_id)

Assessments
  id, activity_id, user_id, type, score, passed, assessed_at, assessed_by
```

### 3. ERP / Logistics Tables

```
Sessions                       -- รอบย่อยของ Activity
  id, activity_id, starts_at, ends_at, location, notes

Session_Attendance
  session_id, user_id, status (present|absent|late), notes

Logistics_Orders
  id, activity_id, order_type (food|place|equipment|transport)
  vendor, details JSONB, budget, actual_cost, status

Expenses
  id, activity_id, category, amount, description, paid_at, receipt_url
```

### 4. Operational Tables

```
Audit_Logs
  id, user_id, action, target_type, target_id, changes JSONB, ip, created_at

Notifications
  id, user_id, channel (line|email|sms), template_key, payload JSONB, sent_at, status

Consent_Logs                  -- ประวัติการยินยอม PDPA
  id, user_id, consent_version, consented_at, ip, checksum

Certificates
  id, user_id, activity_id, issued_at, verify_code, pdf_url
  -- verify_code ใช้ใน QR → verify ผ่าน public URL /verify/:code
```

---

## 📍 Implementation Roadmap

### 🚀 Release 1 — MVP (~2-3 เดือน)

**เป้าหมาย: เปิดรับสมัครออนไลน์ได้จริง ทดแทน Excel/Airtable**

**User ทำได้:**
- [ ] 1.1 Landing Page (ไทย + อังกฤษ)
- [ ] 1.2 Login / Register (เบอร์ + OTP)
- [ ] 1.3 User Dashboard
- [ ] 1.4 Profile (basic: ชื่อ เบอร์ ที่อยู่ ไลน์) + ✅ **ติ๊กยินยอม PDPA ท้ายฟอร์ม**
- [ ] 2.3 Course Catalog + Filter
- [ ] 3.1 Universal Enrollment Form
- [ ] 3.6 Upload สลิป PromptPay

**Admin ทำได้:**
- [ ] 2.1 Activity Manager (ฟอร์มธรรมดา)
- [ ] 2.4 Mix & Match Module → Activity (manual)
- [ ] 3.4 Unified Enrollment backend
- [ ] Verify slip + approve/reject
- [ ] Export CSV

**Infrastructure:**
- [ ] Phase 0: Git + GitHub repo + CI/CD + Staging
- [ ] Cloudflare Pages deployment
- [ ] Neon Postgres + Prisma setup
- [ ] i18n (next-intl) setup ไทย/อังกฤษ
- [ ] 1.5 Auth (Phone + OTP)
- [ ] 1.6 RBAC: Guest/Member/Trainee/Staff/Admin
- [ ] **Database schema ครบทุก Phase** (implement เฉพาะที่ใช้)
- [ ] Audit Logs (basic)

---

### 🎨 Release 2 — Enhanced (~2-3 เดือน)

**เป้าหมาย: ระบบเรียนออนไลน์ + Staff Management**

**User:**
- [ ] 1.4 Profile Full — MBTI, Enneagram, Health (encrypted)
- [ ] 3.3 My Learning Room (YouTube embed + quiz)
- [ ] 4.1 My Transcript + Certificate PDF + QR verify
- [ ] Public verify page `/verify/:code`

**Admin:**
- [ ] 2.2 Drag & Drop Course Builder
- [ ] 2.5 Prerequisites (Graph AND/OR)
- [ ] 3.2 Group Registration (HR)
- [ ] 3.5 Delegate Registration (ลงแทนด้วยเบอร์)
- [ ] 3.7 Progress Tracking
- [ ] 4.2 Staff Management
- [ ] 4.4 Assessment / Evaluation
- [ ] 4.5 Auto-upgrade Trainee → Staff

**Infrastructure:**
- [ ] LINE OA Messaging API integration
- [ ] Email notifications
- [ ] Feedback & Reviews
- [ ] Encryption sensitive fields (pgcrypto)
- [ ] Airtable data migration scripts

---

### 🤖 Release 3 — Advanced ERP (~2-3 เดือน)

**เป้าหมาย: ERP ครบวงจร + Smart Matching**

**Admin:**
- [ ] 4.3 Smart Matcher UI
- [ ] 4.6 **Weighted Scoring Matching Engine**
  ```
  score = (mbti_match × w1) + (passed_courses × w2) + (past_rating × w3) + ...
  ```
- [ ] 5.1 Logistics Dashboard
- [ ] 5.2 Budget & Expense tracking
- [ ] 5.3 Auto-Logistics Calculator (แพ้อาหาร → ใบสั่งซื้ออัตโนมัติ)
- [ ] 5.4 Session Management + แจ้งเตือนเวลา/สถานที่
- [ ] Reports & Analytics Dashboard

**อาจอัพเกรดเมื่อจำเป็น:**
- [ ] Video → Cloudflare Stream (signed URL + watermark)
- [ ] Matching Engine → ML model (เมื่อมีข้อมูล 6-12 เดือน)

---

## 🔐 Security & Compliance

### 🚨 PDPA Compliance

- ✅ **Consent Checkbox ท้ายฟอร์ม Profile** (ติ๊กยินยอม)
  > "ข้าพเจ้ายินยอมให้ Enlight จัดเก็บและใช้ข้อมูลส่วนบุคคล รวมถึงข้อมูลสุขภาพและจิตวิทยา เพื่อวัตถุประสงค์ในการจัดอบรม จับคู่ทีมงาน และบริหารงานทั่วไป ตาม[นโยบายความเป็นส่วนตัว]"
- ✅ Encrypt sensitive fields: `medical_condition`, `allergy` (pgcrypto)
- ✅ Audit Log ทุกครั้งที่เปิดดูข้อมูล sensitive
- ✅ `Consent_Logs` เก็บประวัติการยินยอม (version + timestamp + IP)
- ✅ Right to be forgotten — soft delete + hard delete workflow

### Strength Finder = ตัดออก

- ❌ ไม่เก็บ Strength Finder (เป็นของเก่า, trademark Gallup)
- ✅ เก็บแค่ MBTI + Enneagram

---

## 🚦 Next Steps (ขั้นตอนถัดไป)

1. [ ] **Setup repo** — `git clone git@github.com:sgaipeach-enlight/enlight.git`
2. [ ] **Init Next.js 15 project** — TypeScript, Tailwind, shadcn/ui
3. [ ] **Setup Neon Postgres** — สร้าง free tier account + connection string
4. [ ] **Prisma schema** — design ครบทุก table (Holistic Schema)
5. [ ] **Cloudflare Pages setup** — deploy skeleton แรก
6. [ ] **i18n setup** — next-intl + โครงสร้าง th/en
7. [ ] **Auth skeleton** — Phone + OTP flow (ใช้ mock OTP ก่อน)
8. [ ] **RBAC middleware**
9. [ ] เริ่ม Release 1 features ตามลำดับ

---

## 📦 โครงสร้างโปรเจกต์

```
enlight/
├── prisma/
│   ├── schema.prisma          # DB schema (ครบทุก Phase)
│   └── migrations/
├── messages/                  # i18n translations
│   ├── th.json
│   └── en.json
├── src/
│   ├── app/
│   │   ├── [locale]/          # i18n routing
│   │   │   ├── (public)/      # Landing, Catalog
│   │   │   ├── (auth)/        # Login, Register
│   │   │   ├── (user)/        # Dashboard, Profile, Learning Room
│   │   │   ├── (admin)/       # Activity Mgmt, Staff, Logistics
│   │   │   └── verify/[code]/ # Certificate public verify
│   │   └── api/               # API routes
│   ├── components/            # Shared UI (shadcn/ui)
│   ├── lib/
│   │   ├── auth/              # OTP, session
│   │   ├── db/                # Prisma client
│   │   ├── payment/           # PromptPay, slip verify
│   │   ├── video/             # YouTube embed helper
│   │   ├── line/              # LINE OA messaging
│   │   ├── pdf/               # Certificate generator
│   │   ├── matching/          # Weighted scoring engine
│   │   └── pdpa/              # Encryption, consent
│   ├── server/
│   │   ├── actions/           # Server Actions
│   │   └── services/          # Business logic
│   └── i18n/                  # next-intl config
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── wrangler.toml              # Cloudflare Pages config
└── README.md
```
