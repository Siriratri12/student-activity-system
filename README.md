# ระบบกิจกรรมพัฒนานักศึกษา

## Student Activity System

ระบบเว็บไซต์สำหรับประชาสัมพันธ์กิจกรรมพัฒนานักศึกษา มหาวิทยาลัยสงขลานครินทร์ โดยผู้ใช้งานสามารถดูรายการกิจกรรม ค้นหาและกรองกิจกรรม ดูรายละเอียด ลงทะเบียนเข้าร่วมกิจกรรม และดูรายชื่อผู้ลงทะเบียนของแต่ละกิจกรรมได้

โปรเจกต์นี้พัฒนาในรูปแบบ **Front-end Proof of Concept (POC)** และเชื่อมต่อกับ **Mock REST API** ที่ทำงานด้วย JSON Server

---

## เทคโนโลยีที่ใช้

- React
- Vite
- JavaScript
- React Router DOM
- Axios
- CSS
- Lucide React
- JSON Server
- Git

---

## เว็บไซต์สำหรับทดสอบระบบ

ระบบ Front-end ได้ Deploy ผ่าน Vercel และสามารถทดสอบการใช้งานได้ที่

**Website:**  
https://student-activity-system-ten.vercel.app/

Mock REST API ได้ Deploy ผ่าน Render

**Mock API:**  
https://student-activity-system.onrender.com

สามารถตรวจสอบข้อมูลจาก API ได้ที่

```text
https://student-activity-system.onrender.com/activities
```

และ

```text
https://student-activity-system.onrender.com/registrations
```

> **หมายเหตุ:** Mock API ใช้งานผ่าน Render Free Instance ซึ่งอาจเข้าสู่สถานะพักเมื่อไม่มีการใช้งานเป็นระยะเวลาหนึ่ง ดังนั้นการเปิดระบบครั้งแรกอาจใช้เวลาในการโหลดข้อมูลประมาณ 30–60 วินาที หลังจาก API เริ่มทำงานแล้ว ระบบจะสามารถใช้งานได้ตามปกติ

---

# วิธีรันระบบ

## สิ่งที่ต้องติดตั้งก่อนใช้งาน

เครื่องที่ใช้ทดสอบควรติดตั้ง

- Node.js
- npm
- Git

สามารถตรวจสอบเวอร์ชันได้ด้วยคำสั่ง

```bash
node -v
npm -v
git --version
```

---

## 1. ดาวน์โหลดโปรเจกต์

Clone โปรเจกต์จาก Git Repository

```bash
git clone https://github.com/Siriratri12/student-activity-system.git
```

จากนั้นเข้าไปยังโฟลเดอร์โปรเจกต์

```bash
cd student-activity-system
```

---

## 2. ติดตั้ง Front-end Dependencies

ที่โฟลเดอร์หลักของโปรเจกต์ รันคำสั่ง

```bash
npm install
```

---

## 3. ติดตั้ง Mock API Dependencies

เข้าไปที่โฟลเดอร์ `mock-api`

```bash
cd mock-api
```

จากนั้นรัน

```bash
npm install
```

เมื่อติดตั้งเสร็จแล้ว กลับมายังโฟลเดอร์หลัก

```bash
cd ..
```

---

## 4. รัน Mock API

หากต้องการทดสอบระบบด้วย Mock API ภายในเครื่อง จำเป็นต้องเปิด Mock API และ Front-end พร้อมกัน

แนะนำให้เปิด Terminal จำนวน 2 หน้าต่าง

### Terminal 1 — Mock API

จากโฟลเดอร์หลักของโปรเจกต์ เข้าไปยังโฟลเดอร์

```bash
cd mock-api
```

จากนั้นรัน

```bash
npx json-server --watch db.json --port 3001
```

เมื่อทำงานสำเร็จ Mock API จะให้บริการที่

```text
http://localhost:3001
```

สามารถตรวจสอบรายการกิจกรรมได้ที่

```text
http://localhost:3001/activities
```

และตรวจสอบข้อมูลการลงทะเบียนได้ที่

```text
http://localhost:3001/registrations
```

> กรุณาเปิด Mock API ไว้ระหว่างทดสอบ Front-end ในกรณีที่ตั้งค่า Front-end ให้เชื่อมต่อกับ Local API

---

## 5. รัน Front-end

เปิด Terminal หน้าต่างใหม่ และอยู่ที่โฟลเดอร์หลักของโปรเจกต์

```text
student-activity-system/
```

จากนั้นรัน

```bash
npm run dev
```

เมื่อ Vite ทำงานสำเร็จ Terminal จะแสดง URL เช่น

```text
http://localhost:5173
```

เปิด URL ดังกล่าวผ่าน Web Browser เพื่อใช้งานระบบ

---

## สรุปคำสั่งสำหรับรันระบบ

### Terminal 1

```bash
cd mock-api
npx json-server --watch db.json --port 3001
```

### Terminal 2

```bash
npm run dev
```

จากนั้นเปิด

```text
http://localhost:5173
```

---

# ฟังก์ชันหลักของระบบ

## 1. รายการกิจกรรม (Activity List)

- ดึงรายการกิจกรรมจาก REST API
- แสดงกิจกรรมในรูปแบบ Card
- แสดงกิจกรรมครั้งละ 9 รายการ
- มี Pagination สำหรับแบ่งหน้า
- ค้นหากิจกรรมตามชื่อ
- กรองกิจกรรมตามประเภท
- รองรับสถานะ Loading
- รองรับสถานะ Error
- รองรับกรณีไม่มีข้อมูล (Empty State)

---

## 2. รายละเอียดกิจกรรม (Activity Detail)

ผู้ใช้สามารถกดดูรายละเอียดของแต่ละกิจกรรม โดยแสดงข้อมูล เช่น

- ชื่อกิจกรรม
- ประเภทกิจกรรม
- รายละเอียดกิจกรรม
- วันและเวลา
- สถานที่
- จำนวนที่รับ
- รูปภาพกิจกรรม
- ปุ่มลงทะเบียนเข้าร่วมกิจกรรม
- ปุ่มดูรายชื่อผู้ลงทะเบียน

---

## 3. ลงทะเบียนเข้าร่วมกิจกรรม (Activity Register)

แบบฟอร์มลงทะเบียนประกอบด้วย

- ชื่อ - นามสกุล
- รหัสนักศึกษา
- คณะ
- อีเมล
- เบอร์โทรศัพท์
- PDPA Consent

มีการตรวจสอบข้อมูล (Validation) ก่อนส่ง เช่น

- ตรวจสอบฟิลด์ที่จำเป็น
- ตรวจสอบรูปแบบรหัสนักศึกษา
- ตรวจสอบรูปแบบอีเมล
- ตรวจสอบรูปแบบเบอร์โทรศัพท์
- ต้องให้ความยินยอม PDPA ก่อนลงทะเบียน

เมื่อข้อมูลถูกต้อง ระบบจะส่งข้อมูลไปยัง Mock REST API ด้วย

```text
POST /registrations
```

หลังจากส่งข้อมูล ระบบจะแสดงผลการลงทะเบียนให้ผู้ใช้งานทราบ

---

## 4. รายชื่อผู้ลงทะเบียน (Activity Registrations)

ผู้ใช้สามารถดูรายชื่อผู้ลงทะเบียนของแต่ละกิจกรรมได้ โดยระบบดึงข้อมูลการลงทะเบียนจาก Mock REST API และกรองข้อมูลตาม `activityId` ของกิจกรรมนั้น

ข้อมูลที่แสดงประกอบด้วย

- ชื่อ - นามสกุล
- รหัสนักศึกษา
- คณะ
- อีเมล
- เบอร์โทรศัพท์

ระบบมีการทำ Data Masking สำหรับข้อมูลส่วนบุคคลบางส่วน เช่น

```text
somchai@psu.ac.th
→ so***@psu.ac.th
```

และ

```text
0812345678
→ 081-xxx-5678
```

นอกจากนี้ยังสามารถ

- ค้นหาผู้ลงทะเบียนด้วยชื่อ
- ค้นหาด้วยรหัสนักศึกษา
- แสดงจำนวนผู้ลงทะเบียน
- แสดงจำนวนที่รับของกิจกรรม
- รองรับ Pagination เมื่อมีข้อมูลหลายรายการ
- รองรับ Empty State เมื่อยังไม่มีผู้ลงทะเบียน
- รองรับ Error State เมื่อไม่สามารถเรียกข้อมูลได้

---

## 5. Responsive Design

เว็บไซต์รองรับการแสดงผลบนอุปกรณ์หลายขนาด ได้แก่

- Desktop
- Tablet
- Mobile

องค์ประกอบต่าง ๆ เช่น

- Navigation Bar
- Activity Card
- Activity Detail
- Registration Form
- Registration Table
- User Manual
- Footer

จะปรับรูปแบบตามขนาดหน้าจอ เพื่อให้สามารถใช้งานได้สะดวกบนอุปกรณ์ต่าง ๆ

---

## 6. คู่มือการใช้งาน (User Manual)

ระบบมีหน้าคู่มือการใช้งานภายในเว็บไซต์สำหรับอธิบายขั้นตอนการใช้งานแก่ผู้ใช้ทั่วไป พร้อมภาพประกอบ

เนื้อหาคู่มือครอบคลุมการใช้งานหลัก เช่น

1. การดูรายการกิจกรรม
2. การค้นหาและกรองกิจกรรม
3. การดูรายละเอียดกิจกรรม
4. การลงทะเบียนเข้าร่วมกิจกรรม
5. การดูรายชื่อผู้ลงทะเบียน

นอกจากนี้ได้จัดทำคู่มือการใช้งานในรูปแบบ PDF พร้อมภาพประกอบสำหรับผู้ใช้ทั่วไป และจัดเก็บไว้ภายใน Repository ที่

```text
docs/User-Manual.pdf
```

### ไฟล์คู่มือ

สามารถเปิดไฟล์

```text
docs/User-Manual.pdf
```

เพื่อดูคู่มือการใช้งานระบบฉบับ PDF

---

## 7. ติดต่อสอบถาม (Contact)

ระบบมีหน้าสำหรับแสดงข้อมูลการติดต่อของหน่วยงาน เช่น

- ที่อยู่
- เบอร์โทรศัพท์
- Facebook
- แผนที่
- เส้นทางการเดินทาง

---

# โครงสร้างโปรเจกต์

```text
student-activity-system/
│
├── docs/
│   └── User-Manual.pdf
│
├── mock-api/
│   ├── db.json
│   ├── package.json
│   └── README.md
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │   ├── 1.png
│   │   ├── 2.png
│   │   ├── ...
│   │   ├── 12.png
│   │   ├── Branner.png
│   │   ├── Branner2.png
│   │   ├── Branner3.png
│   │   ├── hero.png
│   │   ├── logo.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── ActivityCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Footer.css
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx
│   │
│   ├── pages/
│   │   ├── ActivityDetail.jsx
│   │   ├── ActivityDetail.css
│   │   ├── ActivityList.jsx
│   │   ├── ActivityList.css
│   │   ├── ActivityRegister.jsx
│   │   ├── ActivityRegister.css
│   │   ├── ActivityRegistrations.jsx
│   │   ├── ActivityRegistrations.css
│   │   ├── ContactPage.jsx
│   │   ├── ContactPage.css
│   │   ├── ManualPage.jsx
│   │   └── ManualPage.css
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

> หมายเหตุ: โฟลเดอร์ `node_modules` ไม่ถูกจัดเก็บใน Git Repository เนื่องจากสามารถติดตั้งใหม่ได้ด้วยคำสั่ง `npm install`

---

# REST API

## Local API

สำหรับการทดสอบภายในเครื่อง

```text
http://localhost:3001
```

## Production Mock API

สำหรับเว็บไซต์ที่ Deploy แล้ว

```text
https://student-activity-system.onrender.com
```

Endpoint หลักที่ระบบใช้งาน

| Method | Endpoint          | รายละเอียด               |
| ------ | ----------------- | ------------------------ |
| GET    | `/activities`     | ดึงรายการกิจกรรม         |
| GET    | `/activities/:id` | ดูรายละเอียดกิจกรรม      |
| GET    | `/registrations`  | ดึงข้อมูลผู้ลงทะเบียน    |
| POST   | `/registrations`  | ลงทะเบียนเข้าร่วมกิจกรรม |

---

# การจัดการสถานะ API

ระบบมีการจัดการสถานะการเรียก API เพื่อให้ผู้ใช้งานได้รับข้อมูลที่เหมาะสมในแต่ละสถานการณ์

## Loading

ระหว่างรอข้อมูลจาก API ระบบจะแสดงสถานะกำลังโหลด เพื่อให้ผู้ใช้งานทราบว่าระบบกำลังดำเนินการ

ตัวอย่าง

```text
กำลังโหลดข้อมูล...
```

---

## Empty State

เมื่อ API ไม่มีข้อมูล ระบบจะแสดงข้อความที่เหมาะสมแทนการแสดงหน้าว่าง

ตัวอย่าง

```text
ไม่พบกิจกรรม
```

หรือ

```text
ยังไม่มีผู้ลงทะเบียน
```

---

## Error State

หากเกิดข้อผิดพลาดในการเชื่อมต่อ API ระบบจะแสดงข้อความแจ้งผู้ใช้อย่างเหมาะสม

ตัวอย่าง

```text
ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง
```

ในหน้าที่รองรับ ผู้ใช้สามารถกดปุ่ม

```text
ลองใหม่
```

เพื่อเรียกข้อมูลจาก API อีกครั้ง

---

# Data Masking

หน้ารายชื่อผู้ลงทะเบียนมีการปิดบังข้อมูลส่วนบุคคลบางส่วนก่อนแสดงผล เพื่อช่วยลดการเปิดเผยข้อมูลส่วนบุคคลที่ไม่จำเป็น

## ตัวอย่างอีเมล

ข้อมูลต้นฉบับ

```text
somchai@psu.ac.th
```

ข้อมูลที่แสดง

```text
so***@psu.ac.th
```

## ตัวอย่างเบอร์โทรศัพท์

ข้อมูลต้นฉบับ

```text
0812345678
```

ข้อมูลที่แสดง

```text
081-xxx-5678
```

Data Masking ทำเฉพาะในส่วนการแสดงผลของ Front-end โดยไม่แก้ไขข้อมูลต้นฉบับที่จัดเก็บอยู่ใน Mock API

---

# Production Build

สามารถสร้าง Production Build ของ Front-end ด้วยคำสั่ง

```bash
npm run build
```

เมื่อ Build สำเร็จ ไฟล์สำหรับ Production จะถูกสร้างไว้ในโฟลเดอร์

```text
dist/
```

สามารถทดสอบ Production Build ด้วยคำสั่ง

```bash
npm run preview
```

---

# การทดสอบ Responsive

สามารถทดสอบ Responsive Design ผ่าน Developer Tools ของ Web Browser

แนะนำให้ตรวจสอบการแสดงผลในขนาด

- Mobile
- Tablet
- Desktop

ระบบจะปรับ Navigation, Layout, Activity Card, Form, Table และองค์ประกอบต่าง ๆ ให้เหมาะสมกับขนาดหน้าจอ

---

# คู่มือการใช้งาน PDF

คู่มือการใช้งานระบบสำหรับผู้ใช้ทั่วไปจัดทำในรูปแบบ PDF พร้อมภาพประกอบ

ตำแหน่งไฟล์

```text
docs/User-Manual.pdf
```

คู่มือประกอบด้วยขั้นตอนการใช้งานฟังก์ชันหลักของระบบ ได้แก่

1. การเข้าสู่หน้ารายการกิจกรรม
2. การค้นหากิจกรรม
3. การกรองกิจกรรมตามประเภท
4. การดูรายละเอียดกิจกรรม
5. การลงทะเบียนเข้าร่วมกิจกรรม
6. การให้ความยินยอม PDPA
7. การดูรายชื่อผู้ลงทะเบียน
8. การใช้งานระบบบนอุปกรณ์ขนาดต่าง ๆ

---

# หมายเหตุ

โปรเจกต์นี้เป็น **Front-end Proof of Concept (POC)** สำหรับระบบกิจกรรมพัฒนานักศึกษา

ไม่มีการพัฒนา Back-end หรือฐานข้อมูลจริง โดยใช้ **JSON Server** เป็น Mock REST API สำหรับจำลองการรับและส่งข้อมูล

ข้อมูลสำหรับทดสอบระบบจัดเก็บอยู่ใน

```text
mock-api/db.json
```

สำหรับการใช้งานบน Production ตัว Mock REST API ถูก Deploy ผ่าน Render และ Front-end ถูก Deploy ผ่าน Vercel

---

# เอกสารประกอบ

เอกสารที่จัดเตรียมไว้ภายใน Repository ประกอบด้วย

| เอกสาร                 | ตำแหน่ง                 |
| ---------------------- | ---------------------- |
| README                 | `README.md`            |
| คู่มือการใช้งาน PDF        | `docs/User-Manual.pdf` |
| Mock API Documentation | `mock-api/README.md`   |
