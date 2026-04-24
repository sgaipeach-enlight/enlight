# 🔧 Cloudflare Setup Discussion

> ไฟล์ทดลอง/ใช้คุยกันชั่วคราว — ข้อมูลตกลงแล้วค่อยย้ายไป README.md

---

## 🗺️ Cloudflare Services Mapping สำหรับ Enlight

### ใช้แน่ๆ (ฟรี)

| Service | ใช้ทำอะไร | Free Tier |
|---------|----------|-----------|
| **Cloudflare Pages** ⭐ | Host Next.js app | Unlimited requests, 500 builds/เดือน, preview URLs |
| **Cloudflare R2** | เก็บไฟล์ (สลิปโอน, certificate PDF, รูป) | 10GB + 10M reads/เดือน — **ไม่มี egress fee** |
| **Cloudflare DNS** | จัดการ domain | ฟรี |
| **Cloudflare CDN** | Cache static assets | ฟรี |
| **Cloudflare SSL** | HTTPS cert | ฟรี |
| **Cloudflare Turnstile** | CAPTCHA กัน bot สมัคร | 1M verifications/เดือน |
| **Cloudflare Web Analytics** | Stats การใช้งาน (privacy-friendly) | ฟรี |

### อาจใช้ภายหลัง

| Service | ใช้ทำอะไร | ราคา |
|---------|----------|-----|
| **Cloudflare Workers** | API routes ที่ซับซ้อน | 100k requests/วัน ฟรี |
| **Cloudflare KV** | Cache / Session / Rate limit | 100k reads/วัน ฟรี |
| **Cloudflare Queues** | Background jobs (ส่ง LINE/email) | จ่ายเมื่อใช้ |
| **Cloudflare Stream** | Video (แทน YouTube) | $5/1000 นาทีที่ดู |
| **Cloudflare Email Routing** | รับ-ส่งเมลด้วย domain เรา | ฟรี (forward only) |

### ❌ ไม่ใช้ (เพราะมีทางเลือกดีกว่า)

- **Cloudflare D1** (SQLite) — เราใช้ **Neon PostgreSQL** แล้ว ดีกว่าสำหรับ schema ซับซ้อน
- **Cloudflare Zaraz** (tag manager) — ยังไม่จำเป็น

### 🔗 บริการนอก Cloudflare ที่ต้องใช้

| Service | ใช้ทำอะไร |
|---------|----------|
| **Neon** | PostgreSQL database |
| **LINE Developers** | LINE OA Messaging API |
| **ThaiBulkSMS** (หรือใกล้เคียง) | SMS OTP |
| **GitHub** | Source code repo (เชื่อมเข้า Cloudflare Pages) |

---

## 🏗️ Architecture ภาพรวม

```
                    ┌─────────────────────┐
User (Browser) ───► │   Cloudflare DNS    │
                    │      + SSL + CDN    │
                    └─────────┬───────────┘
                              │
                    ┌─────────▼───────────┐
                    │  Cloudflare Pages   │ ◄── Auto-deploy
                    │  (Next.js 15 app)   │     from GitHub
                    └─────────┬───────────┘
                              │
              ┌───────────────┼───────────────┬─────────────┐
              │               │               │             │
       ┌──────▼─────┐  ┌──────▼──────┐ ┌──────▼──────┐ ┌───▼──────┐
       │   Neon     │  │ Cloudflare  │ │  LINE OA    │ │  SMS     │
       │ PostgreSQL │  │     R2      │ │ Messaging   │ │ Provider │
       │  (Prisma)  │  │   (files)   │ │             │ │          │
       └────────────┘  └─────────────┘ └─────────────┘ └──────────┘
```

---

## 📋 Step-by-Step: เชื่อม GitHub → Cloudflare Pages

### ขั้นที่ 1: สมัคร Cloudflare (ถ้ายังไม่มี)
- ไปที่ https://dash.cloudflare.com/sign-up
- ใช้อีเมลเดียวกับ GitHub หรือ work email ก็ได้

### ขั้นที่ 2: สร้าง Pages Project
1. ไปที่ Cloudflare Dashboard → **Workers & Pages** → **Create**
2. เลือก **Pages** → **Connect to Git**
3. **Authorize GitHub** (ให้ Cloudflare เข้าถึง repo `sgaipeach-enlight/enlight`)
4. เลือก repo `enlight`
5. Build settings:
   - **Framework preset**: `Next.js`
   - **Build command**: `npx @cloudflare/next-on-pages@1`
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: `/`
   - **Node version**: `20` (หรือใหม่กว่า)

### ขั้นที่ 3: Environment Variables (ทำทีหลังเมื่อมี)
- `DATABASE_URL` — Neon connection string
- `DIRECT_URL` — Neon direct connection (สำหรับ Prisma migrate)
- `SMS_API_KEY`
- `LINE_CHANNEL_SECRET`
- `ENCRYPTION_KEY` — สำหรับ encrypt sensitive data
- (ฯลฯ ตามที่ใช้)

### ขั้นที่ 4: Custom Domain (ทีหลัง)
- ถ้า domain ของหลวงพี่ manage ที่ Cloudflare อยู่แล้ว → click & assign ได้เลย
- ถ้า domain อยู่ที่อื่น → ย้าย NS มา Cloudflare ก่อน (ฟรี)

### ขั้นที่ 5: R2 Bucket (สำหรับไฟล์)
1. Dashboard → **R2** → **Create bucket**
2. ตั้งชื่อ: `enlight-files`
3. สร้าง **API Token** สำหรับ S3 API (เอาไปใส่ใน env vars)

### ขั้นที่ 6: Setup Neon
1. สมัคร https://neon.tech (ฟรี)
2. Create project → เลือก region **Asia Pacific (Singapore)**
3. เอา connection strings มาใส่ env vars

---

## 🚦 ลำดับที่แนะนำให้ทำ

1. [ ] **ยืนยันเลือก Prisma หรือ Drizzle** (น้องเสนอ Prisma)
2. [ ] **สมัคร Cloudflare account** (ถ้ายังไม่มี)
3. [ ] **สมัคร Neon account**
4. [ ] **Init Next.js project ใน local** + push ขึ้น GitHub
5. [ ] **เชื่อม Cloudflare Pages กับ GitHub** → deploy skeleton
6. [ ] **Setup Neon DB + Prisma schema**
7. [ ] **เพิ่ม env vars ใน Cloudflare Pages**
8. [ ] เริ่มเขียน feature Release 1

---

## ❓ คำถามสำหรับหลวงพี่

- [ ] **มี Cloudflare account แล้วยังคะ?** (หรือให้น้องแนะนำวิธีสมัคร)
- [ ] **Domain name ที่จะใช้** คืออะไรคะ? อยู่ที่ registrar ไหน?
- [ ] **ยืนยัน Prisma** (ทางเลือก A) หรือจะเลือก Drizzle (ทางเลือก B)?
- [ ] **Region ของ DB** — Singapore (ใกล้ไทยสุด) ok ไหมคะ?
