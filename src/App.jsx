// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";

// นำเข้า MainLayout
import MainLayout from "./layouts/MainLayout";

// นำเข้า Pages ทั้งหมด (ตรวจสอบว่าคุณได้สร้างไฟล์เหล่านี้แล้วในโฟลเดอร์ pages/)
import ActivityList from "./pages/ActivityList"; // หน้าหลักรายการกิจกรรม
import ActivityDetail from "./pages/ActivityDetail";
import ActivityRegister from "./pages/ActivityRegister";
import ActivityRegistrations from "./pages/ActivityRegistrations";

// นำเข้าหน้าอื่นๆ ตามเมนูใหม่
import ManualPage from "./pages/ManualPage"; // สร้างไฟล์ ManualPage.jsx แล้ว
import ContactPage from "./pages/ContactPage"; // แก้ไขชื่อ Import ให้ตรงกับ ContactPage.jsx
// import AboutPage from "./pages/ContactPage"; // [ไม่ใช้แล้ว]
// import HomePage from "./pages/HomePage"; // [ไม่ใช้แล้ว]

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- ใช้ Layout Route ครอบเส้นทางทั้งหมด --- */}
        <Route element={<MainLayout />}>
          {/* --- ปรับแก้ Route ให้ตรงกับ Navbar.jsx ใหม่ --- */}
          {/* 1. ตั้งค่าหน้าแรก (/) ให้แสดงผลเป็นหน้ากิจกรรม (/activities) */}
          <Route path="/" element={<ActivityList />} />
          <Route path="/activities" element={<ActivityList />} />
          {/* 2. สลับตำแหน่ง: เอา "คู่มือ" (/manual) มาไว้ก่อน "ติดต่อเรา" (/contact) */}
          <Route path="/manual" element={<ManualPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* <Route path="/about" element={<ContactPage />} /> */}{" "}
          {/* [แก้ path จาก /about เป็น /contact] */}
          {/* ----------------------------------------- */}
          {/* เส้นทางย่อยของกิจกรรม (ไม่ต้องมี link ใน Navbar หลัก) */}
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route
            path="/activities/:id/register"
            element={<ActivityRegister />}
          />
          <Route
            path="/activities/:id/registrations"
            element={<ActivityRegistrations />}
          />
        </Route>

        {/* ตัวอย่าง: หากมีหน้า Login ที่ไม่ต้องใช้ Navbar */}
        {/* <Route path="/login" element={<Login />} /> */}

        {/* เพิ่มหน้า 404 Not Found (แนะนำให้มีเก็บคะแนน UX) */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
