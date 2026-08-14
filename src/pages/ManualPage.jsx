import React from "react";
import {
  Search,
  ClipboardList,
  FileText,
  CheckCircle2,
  BookOpen,
  ChevronRight,
  CircleHelp,
} from "lucide-react";

import "./ManualPage.css";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "ค้นหากิจกรรม",
    description:
      "ค้นหากิจกรรมที่สนใจจากชื่อกิจกรรม สถานที่ หรือเลือกประเภทกิจกรรมที่ต้องการ",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "ดูรายละเอียดกิจกรรม",
    description:
      "ตรวจสอบรายละเอียดกิจกรรม วันและเวลา สถานที่จัดกิจกรรม และจำนวนผู้เข้าร่วม",
  },
  {
    number: "03",
    icon: FileText,
    title: "กรอกข้อมูลลงทะเบียน",
    description:
      "กรอกข้อมูลส่วนตัวให้ครบถ้วน เช่น ชื่อ-นามสกุล รหัสนักศึกษา คณะ อีเมล และเบอร์โทรศัพท์",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "ยืนยันการลงทะเบียน",
    description:
      "ตรวจสอบข้อมูลอีกครั้ง ยอมรับเงื่อนไข และกดยืนยันเพื่อเสร็จสิ้นการลงทะเบียนกิจกรรม",
  },
];

function Manual() {
  return (
    <main className="manual-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="manual-hero">
        <div className="manual-container manual-hero__inner">
          <div className="manual-hero__icon">
            <BookOpen size={28} />
          </div>

          <div>
            <span className="manual-hero__eyebrow">USER GUIDE</span>

            <h1>คู่มือการใช้งาน</h1>

            <p>
              ขั้นตอนการค้นหากิจกรรม ดูรายละเอียด
              และลงทะเบียนเข้าร่วมกิจกรรมสำหรับนักศึกษา
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="manual-container manual-content">
        <div className="manual-section-heading">
          <span>ขั้นตอนการใช้งาน</span>

          <h2>เริ่มต้นใช้งานได้ง่าย ๆ ใน 4 ขั้นตอน</h2>

          <p>
            นักศึกษาสามารถค้นหาและลงทะเบียนกิจกรรมที่สนใจได้ตามขั้นตอนต่อไปนี้
          </p>
        </div>

        {/* STEPS */}

        <div className="manual-steps">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <React.Fragment key={step.number}>
                <article className="manual-step-card">
                  <div className="manual-step-card__top">
                    <div className="manual-step-icon">
                      <Icon size={24} />
                    </div>

                    <span className="manual-step-number">
                      STEP {step.number}
                    </span>
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </article>

                {index < steps.length - 1 && (
                  <div className="manual-step-arrow" aria-hidden="true">
                    <ChevronRight size={22} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* =================================================
            DETAIL
        ================================================= */}

        <section className="manual-detail">
          <div className="manual-detail__heading">
            <div className="manual-detail__icon">
              <CircleHelp size={22} />
            </div>

            <div>
              <span>รายละเอียดเพิ่มเติม</span>
              <h2>วิธีลงทะเบียนกิจกรรม</h2>
            </div>
          </div>

          <div className="manual-detail-list">
            <div className="manual-detail-item">
              <span className="manual-detail-number">1</span>

              <div>
                <h3>เลือกกิจกรรมที่สนใจ</h3>

                <p>
                  ไปที่เมนู “กิจกรรม”
                  จากนั้นค้นหาหรือเลือกประเภทกิจกรรมที่ต้องการ แล้วกดปุ่ม
                  “ดูรายละเอียด”
                </p>
              </div>
            </div>

            <div className="manual-detail-item">
              <span className="manual-detail-number">2</span>

              <div>
                <h3>ตรวจสอบรายละเอียด</h3>

                <p>
                  อ่านรายละเอียด วัน เวลา สถานที่
                  และจำนวนที่เปิดรับให้เรียบร้อยก่อนลงทะเบียน
                </p>
              </div>
            </div>

            <div className="manual-detail-item">
              <span className="manual-detail-number">3</span>

              <div>
                <h3>กรอกข้อมูลให้ครบถ้วน</h3>

                <p>
                  กรอกชื่อ-นามสกุล รหัสนักศึกษา คณะ อีเมล
                  และหมายเลขโทรศัพท์ให้ถูกต้อง
                </p>
              </div>
            </div>

            <div className="manual-detail-item">
              <span className="manual-detail-number">4</span>

              <div>
                <h3>ยืนยันการลงทะเบียน</h3>

                <p>
                  ตรวจสอบข้อมูล ยอมรับเงื่อนไข และกดยืนยันการลงทะเบียน
                  ระบบจะแจ้งผลเมื่อดำเนินการสำเร็จ
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NOTE */}

        <div className="manual-note">
          <div className="manual-note__icon">
            <CircleHelp size={21} />
          </div>

          <div>
            <h3>ข้อแนะนำ</h3>

            <p>
              กรุณาตรวจสอบข้อมูลก่อนยืนยันการลงทะเบียน โดยเฉพาะรหัสนักศึกษา
              อีเมล และหมายเลขโทรศัพท์ เพื่อให้ข้อมูลการลงทะเบียนถูกต้อง
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Manual;
