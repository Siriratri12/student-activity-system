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
- Vercel
- Render

---

# เว็บไซต์สำหรับทดสอบระบบ

ระบบ Front-end ได้ Deploy ผ่าน Vercel และสามารถทดลองใช้งานได้ที่

**Website**

https://student-activity-system-ten.vercel.app/

Mock REST API ได้ Deploy ผ่าน Render

**Mock API**

https://student-activity-system.onrender.com

สามารถตรวจสอบข้อมูลกิจกรรมได้ที่

```text
https://student-activity-system.onrender.com/activities
```

และตรวจสอบข้อมูลผู้ลงทะเบียนได้ที่

```text
https://student-activity-system.onrender.com/registrations
```

> **หมายเหตุ:** Mock API ใช้งานผ่าน Render Free Instance ซึ่งอาจเข้าสู่สถานะพักเมื่อไม่มีการใช้งานเป็นระยะเวลาหนึ่ง ดังนั้นการเปิดระบบออนไลน์ครั้งแรกอาจใช้เวลาในการโหลดข้อมูลประมาณ 30–60 วินาที หลังจาก Service เริ่มทำงานแล้วระบบจะสามารถใช้งานได้ตามปกติ

> **หมายเหตุเกี่ยวกับข้อมูลการลงทะเบียนออนไลน์:** ระบบออนไลน์ใช้ JSON Server เป็น Mock API สำหรับการสาธิต ข้อมูลที่เพิ่มระหว่างการใช้งานบน Render อาจไม่คงอยู่ถาวรเมื่อ Service มีการ Restart หรือ Redeploy สำหรับการทดสอบฟังก์ชันแบบครบถ้วน แนะนำให้รัน Mock API ภายในเครื่องตามขั้นตอนใน README

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

## 4. ตั้งค่า Environment Variable

Front-end ใช้ Environment Variable ชื่อ

```text
VITE_API_URL
```

สำหรับกำหนด URL ของ REST API

### กรณีทดสอบภายในเครื่อง

สร้างไฟล์ `.env` ที่โฟลเดอร์หลักของโปรเจกต์

```env
VITE_API_URL=http://localhost:3001
```

### กรณี Production

ระบบที่ Deploy บน Vercel ใช้

```env
VITE_API_URL=https://student-activity-system.onrender.com
```

> หลังจากแก้ไขค่า Environment Variable ต้อง Restart Development Server หรือ Redeploy ระบบเพื่อให้ค่ามีผล

---

## 5. รัน Mock API

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

> กรุณาเปิด Mock API ไว้ระหว่างทดสอบ Front-end ภายในเครื่อง

---

## 6. รัน Front-end

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
- รหัสนักศึกษาต้องเป็นตัวเลข 10 หลัก
- ตรวจสอบรูปแบบอีเมล
- เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลักและขึ้นต้นด้วย 0
- ต้องให้ความยินยอม PDPA ก่อนลงทะเบียน
- ตรวจสอบการลงทะเบียนกิจกรรมซ้ำด้วยรหัสนักศึกษา

เมื่อข้อมูลถูกต้อง ระบบจะส่งข้อมูลไปยัง Mock REST API ด้วย

```text
POST /registrations
```

หลังจากลงทะเบียนสำเร็จ ระบบจะแสดงข้อความยืนยัน และเมื่อกดปุ่ม `ตกลง` ระบบจะนำผู้ใช้งานไปยังหน้ารายชื่อผู้ลงทะเบียนของกิจกรรมนั้น

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
- แสดงจำนวนผู้ลงทะเบียนเทียบกับจำนวนที่รับของกิจกรรม
- รองรับ Pagination เมื่อมีข้อมูลหลายรายการ
- รองรับ Empty State เมื่อยังไม่มีผู้ลงทะเบียน
- รองรับ Error State เมื่อไม่สามารถเรียกข้อมูลได้

ผู้ใช้งานสามารถเข้าสู่หน้ารายชื่อผู้ลงทะเบียนได้จาก

1. ปุ่ม `ดูรายชื่อผู้ลงทะเบียน` ในหน้ารายละเอียดกิจกรรม
2. หลังลงทะเบียนสำเร็จและกดปุ่ม `ตกลง`

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
- Contact Page
- Footer

จะปรับรูปแบบตามขนาดหน้าจอ เพื่อให้สามารถใช้งานได้สะดวกบนอุปกรณ์ต่าง ๆ

---

## 6. คู่มือการใช้งาน (User Manual)

ระบบมีหน้าคู่มือการใช้งานภายในเว็บไซต์

```text
/manual
```

คู่มือภายในเว็บไซต์ออกแบบในรูปแบบ Accordion โดยผู้ใช้งานสามารถกดเลือกหัวข้อเพื่อเปิดดูรายละเอียดและภาพประกอบได้

เนื้อหาคู่มือครอบคลุม

1. หน้ารายการกิจกรรม
2. รายละเอียดกิจกรรมและการลงทะเบียน
3. ลงทะเบียนเข้าร่วมกิจกรรม
4. การตรวจสอบความถูกต้องของข้อมูล
5. การลงทะเบียนสำเร็จและดูรายชื่อผู้ลงทะเบียน
6. คู่มือการใช้งาน
7. การติดต่อสอบถาม

นอกจากนี้ได้จัดทำ **คู่มือการใช้งานในรูปแบบ PDF พร้อมภาพประกอบ** สำหรับผู้ใช้ทั่วไป

ไฟล์ PDF สำหรับใช้งานผ่านเว็บไซต์จัดเก็บไว้ที่

```text
public/docs/User-Manual.pdf
```

และสามารถเปิดผ่านเว็บไซต์ได้ที่

```text
/docs/User-Manual.pdf
```

ภายในหน้าคู่มือมีปุ่ม

```text
ดาวน์โหลดคู่มือ PDF
```

สำหรับดาวน์โหลดเอกสารคู่มือฉบับเต็ม

---

## 7. ติดต่อสอบถาม (Contact)

ระบบมีหน้าสำหรับแสดงข้อมูลการติดต่อของหน่วยงาน ได้แก่

- ข้อมูลหน่วยงาน
- ที่อยู่
- เบอร์โทรศัพท์
- Facebook Fanpage
- แผนที่
- เส้นทางการเดินทาง

---

# โครงสร้างโปรเจกต์

```text
student-activity-system/
│
├── mock-api/
│   ├── db.json
│   ├── package.json
│   └── README.md
│
├── public/
│   └── docs/
│       └── User-Manual.pdf
│
├── src/
│   │
│   ├── assets/
│   │   ├── Branner.png
│   │   ├── Branner2.png
│   │   ├── Branner3.png
│   │   ├── hero.png
│   │   ├── logo.png
│   │   ├── manual-activity-list.png
│   │   ├── manual-activity-detail.png
│   │   ├── manual-register.png
│   │   ├── manual-validation.png
│   │   ├── manual-success.png
│   │   ├── manual-guide.png
│   │   └── manual-contact.png
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
├── vercel.json
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

สำหรับการค้นหา กรอง และแบ่งหน้า Front-end จะส่ง Query Parameters ไปยัง `/activities` ตามเงื่อนไขที่ต้องการ

---

# การเชื่อมต่อ API

การเชื่อมต่อ API ถูกจัดการภายในไฟล์

```text
src/services/api.js
```

โดยใช้ Axios และ Environment Variable

```text
VITE_API_URL
```

หากไม่มีการกำหนด Environment Variable ระบบจะใช้ค่าเริ่มต้น

```text
http://localhost:3001
```

---

# การจัดการสถานะ API

ระบบมีการจัดการสถานะการเรียก API เพื่อให้ผู้ใช้งานได้รับข้อมูลที่เหมาะสมในแต่ละสถานการณ์

## Loading

ระหว่างรอข้อมูลจาก API ระบบจะแสดงสถานะกำลังโหลด

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

ในหน้าที่รองรับ ผู้ใช้งานสามารถกดปุ่ม

```text
ลองใหม่
```

เพื่อเรียกข้อมูลจาก API อีกครั้ง

---

# Validation

ระบบมีการตรวจสอบข้อมูลก่อนบันทึกการลงทะเบียน ได้แก่

### ชื่อ - นามสกุล

ต้องกรอกข้อมูลและไม่สามารถเว้นว่างได้

### รหัสนักศึกษา

ต้องเป็นตัวเลขจำนวน 10 หลัก

### คณะ

ต้องกรอกข้อมูลและไม่สามารถเว้นว่างได้

### อีเมล

ต้องอยู่ในรูปแบบอีเมลที่ถูกต้อง เช่น

```text
example@email.com
```

### เบอร์โทรศัพท์

ต้องเป็นตัวเลขจำนวน 10 หลัก และขึ้นต้นด้วย `0`

### PDPA Consent

ผู้ใช้งานต้องทำเครื่องหมายให้ความยินยอมก่อนยืนยันการลงทะเบียน

### Duplicate Registration

ระบบตรวจสอบรหัสนักศึกษาก่อนบันทึก เพื่อป้องกันการลงทะเบียนกิจกรรมเดียวกันซ้ำ

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

Data Masking ทำเฉพาะในส่วนการแสดงผลของ Front-end โดยไม่แก้ไขข้อมูลต้นฉบับใน Mock API

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

# Deployment

## Front-end

Front-end Deploy ผ่าน

```text
Vercel
```

URL

```text
https://student-activity-system-ten.vercel.app/
```

เนื่องจากระบบใช้ React Router และ BrowserRouter จึงมีการกำหนด SPA Rewrite ภายในไฟล์

```text
vercel.json
```

เพื่อให้สามารถ Refresh หน้า Route เช่น

```text
/activities/:id
/activities/:id/register
/activities/:id/registrations
/manual
/contact
```

ได้โดยไม่เกิดข้อผิดพลาด `404 NOT_FOUND`

---

## Mock API

Mock REST API Deploy ผ่าน

```text
Render
```

URL

```text
https://student-activity-system.onrender.com
```

Render ใช้สำหรับให้เว็บไซต์ที่ Deploy แล้วสามารถเรียกข้อมูลกิจกรรมและทดสอบการลงทะเบียนผ่าน Mock REST API ได้

> Mock API ออนไลน์ใช้สำหรับการสาธิตและทดสอบระบบเท่านั้น สำหรับการตรวจสอบฟังก์ชันที่ต้องการข้อมูลคงอยู่ แนะนำให้รัน JSON Server ภายในเครื่อง

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
public/docs/User-Manual.pdf
```

เมื่อรันระบบแล้วสามารถเปิดได้จาก

```text
http://localhost:5173/docs/User-Manual.pdf
```

และบนระบบออนไลน์สามารถเปิดได้จาก

```text
https://student-activity-system-ten.vercel.app/docs/User-Manual.pdf
```

คู่มือประกอบด้วยหัวข้อหลัก ได้แก่

1. หน้ารายการกิจกรรม
2. รายละเอียดกิจกรรมและการลงทะเบียน
3. ลงทะเบียนเข้าร่วมกิจกรรม
4. การตรวจสอบความถูกต้องของข้อมูล
5. การลงทะเบียนสำเร็จและดูรายชื่อผู้ลงทะเบียน
6. คู่มือการใช้งาน
7. การติดต่อสอบถาม

---

# หมายเหตุ

โปรเจกต์นี้เป็น **Front-end Proof of Concept (POC)** สำหรับระบบกิจกรรมพัฒนานักศึกษา

ไม่มีการพัฒนา Back-end หรือฐานข้อมูลจริง โดยใช้ **JSON Server** เป็น Mock REST API สำหรับจำลองการรับและส่งข้อมูล

ข้อมูลตัวอย่างสำหรับทดสอบระบบจัดเก็บอยู่ใน

```text
mock-api/db.json
```

สำหรับระบบออนไลน์

- Front-end Deploy ผ่าน Vercel
- Mock REST API Deploy ผ่าน Render
- ใช้ Environment Variable `VITE_API_URL` สำหรับกำหนด API Base URL

---

# เอกสารประกอบ

| เอกสาร                 | ตำแหน่ง                       |
| ---------------------- | ----------------------------- |
| README                 | `README.md`                   |
| คู่มือการใช้งาน PDF    | `public/docs/User-Manual.pdf` |
| Mock API Documentation | `mock-api/README.md`          |

---

## User Manual

คู่มือการใช้งานสามารถเข้าถึงได้ 2 รูปแบบ

### คู่มือภายในเว็บไซต์

```text
/manual
```

### คู่มือ PDF

```text
public/docs/User-Manual.pdf
```
