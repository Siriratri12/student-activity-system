import React, { useState } from "react";

import {
  Search,
  ClipboardList,
  FileText,
  CheckCircle2,
  BookOpen,
  ChevronRight,
  ChevronDown,
  CircleHelp,
  Download,
  ListChecks,
  BadgeCheck,
  PhoneCall,
} from "lucide-react";

import manualActivityList from "../assets/manual-activity-list.png";
import manualActivityDetail from "../assets/manual-activity-detail.png";
import manualRegister from "../assets/manual-register.png";
import manualValidation from "../assets/manual-validation.png";
import manualSuccess from "../assets/manual-success.png";
import manualGuide from "../assets/manual-guide.png";
import manualContact from "../assets/manual-contact.png";

import "./ManualPage.css";

/* ============================================================
   4 ขั้นตอนหลัก
   ============================================================ */

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
      "ตรวจสอบข้อมูลอีกครั้ง ยอมรับ PDPA และกดยืนยันเพื่อเสร็จสิ้นการลงทะเบียนกิจกรรม",
  },
];

/* ============================================================
   รายละเอียดคู่มือ 1 - 7
   ============================================================ */

const manualSections = [
  {
    id: "activity-list",
    number: "01",
    icon: Search,
    title: "หน้ารายการกิจกรรม",
    shortDescription: "ค้นหา กรอง และเลือกกิจกรรมที่สนใจ",
    image: manualActivityList,
    imageAlt: "หน้ารายการกิจกรรม",
    content: (
      <>
        <p>
          เมื่อเข้าสู่เว็บไซต์ ระบบจะแสดงหน้ารายการกิจกรรม
          ซึ่งเป็นหน้าหลักสำหรับค้นหาและเลือกกิจกรรมพัฒนานักศึกษาที่สนใจ
        </p>

        <ul>
          <li>
            <strong>เมนูนำทาง</strong> — ใช้เข้าสู่หน้ากิจกรรม คู่มือการใช้งาน
            และติดต่อเรา
          </li>

          <li>
            <strong>ช่องค้นหากิจกรรม</strong> — ค้นหาจากชื่อกิจกรรม สถานที่
            หรือคำที่เกี่ยวข้อง
          </li>

          <li>
            <strong>ตัวกรองประเภทกิจกรรม</strong> — เลือกประเภทกิจกรรมที่ต้องการ
            หรือเลือก “ทั้งหมด”
          </li>

          <li>
            <strong>ปุ่มค้นหา</strong> — กดเพื่อแสดงกิจกรรมที่ตรงกับเงื่อนไข
          </li>

          <li>
            <strong>รายการกิจกรรม</strong> — แสดงกิจกรรมในรูปแบบการ์ด
            พร้อมข้อมูลเบื้องต้น
          </li>

          <li>
            <strong>ดูรายละเอียดกิจกรรม</strong> — กดปุ่ม “ดูรายละเอียด”
            เพื่อเข้าสู่หน้ารายละเอียดของกิจกรรม
          </li>

          <li>
            <strong>การเปลี่ยนหน้า (Pagination)</strong> —
            ระบบแสดงกิจกรรมครั้งละ 9 รายการ
            และสามารถกดหมายเลขหน้าหรือปุ่มลูกศรเพื่อดูหน้าถัดไป
          </li>
        </ul>
      </>
    ),
  },

  {
    id: "activity-detail",
    number: "02",
    icon: ClipboardList,
    title: "รายละเอียดกิจกรรมและการลงทะเบียน",
    shortDescription: "ตรวจสอบข้อมูลกิจกรรมก่อนตัดสินใจลงทะเบียน",
    image: manualActivityDetail,
    imageAlt: "หน้ารายละเอียดกิจกรรม",
    content: (
      <>
        <p>
          เมื่อกดปุ่ม “ดูรายละเอียด” จากหน้ารายการกิจกรรม
          ระบบจะแสดงข้อมูลของกิจกรรมที่เลือก
          เพื่อให้ผู้ใช้งานตรวจสอบก่อนตัดสินใจลงทะเบียน
        </p>

        <ul>
          <li>
            <strong>ข้อมูลกิจกรรม</strong> — แสดงชื่อกิจกรรม ประเภท วันที่ เวลา
            สถานที่ และจำนวนที่รับ
          </li>

          <li>
            <strong>รายละเอียดกิจกรรม</strong> —
            แสดงคำอธิบายและข้อมูลเพิ่มเติมเกี่ยวกับกิจกรรม
          </li>

          <li>
            <strong>ลงทะเบียนเข้าร่วมกิจกรรม</strong> —
            กดเพื่อเข้าสู่หน้ากรอกข้อมูลลงทะเบียน
          </li>

          <li>
            <strong>ดูรายชื่อผู้ลงทะเบียน</strong> —
            ใช้ตรวจสอบรายชื่อผู้ที่ลงทะเบียนเข้าร่วมกิจกรรมนั้นแล้ว
          </li>
        </ul>
      </>
    ),
  },

  {
    id: "registration",
    number: "03",
    icon: FileText,
    title: "ลงทะเบียนเข้าร่วมกิจกรรม",
    shortDescription: "กรอกข้อมูล ตรวจสอบ และให้ความยินยอม PDPA",
    image: manualRegister,
    imageAlt: "หน้าลงทะเบียนเข้าร่วมกิจกรรม",
    content: (
      <>
        <p>
          เมื่อเข้าสู่หน้าลงทะเบียน
          ระบบจะแสดงข้อมูลกิจกรรมและแบบฟอร์มสำหรับกรอกข้อมูลผู้เข้าร่วม
        </p>

        <ul>
          <li>
            <strong>ตรวจสอบข้อมูลกิจกรรม</strong> — ตรวจสอบชื่อกิจกรรม วันที่
            เวลา และสถานที่
          </li>

          <li>
            <strong>กรอกข้อมูลผู้ลงทะเบียน</strong> — ชื่อ-นามสกุล รหัสนักศึกษา
            คณะ อีเมล และเบอร์โทรศัพท์
          </li>

          <li>
            <strong>ตรวจสอบความถูกต้องของข้อมูล</strong> —
            ระบบจะตรวจสอบฟิลด์ที่จำเป็นและรูปแบบข้อมูลก่อนบันทึก
          </li>

          <li>
            <strong>ยินยอม PDPA</strong> —
            อ่านรายละเอียดและทำเครื่องหมายยินยอมก่อนลงทะเบียน
          </li>

          <li>
            <strong>ยืนยันการลงทะเบียน</strong> — ตรวจสอบข้อมูลทั้งหมดแล้วกดปุ่ม
            “ยืนยันการลงทะเบียน”
          </li>
        </ul>

        <div className="manual-inline-tip">
          ควรตรวจสอบชื่อ รหัสนักศึกษา อีเมล
          และเบอร์โทรศัพท์ให้ถูกต้องก่อนกดยืนยันการลงทะเบียน
        </div>
      </>
    ),
  },

  {
    id: "validation",
    number: "04",
    icon: ListChecks,
    title: "การตรวจสอบความถูกต้องของข้อมูล",
    shortDescription: "ระบบแจ้งเตือนเมื่อข้อมูลไม่ครบหรือรูปแบบไม่ถูกต้อง",
    image: manualValidation,
    imageAlt: "ตัวอย่างการตรวจสอบข้อมูลในแบบฟอร์ม",
    content: (
      <>
        <p>
          ระบบจะตรวจสอบข้อมูลก่อนบันทึกการลงทะเบียน หากข้อมูลไม่ถูกต้อง
          ช่องที่มีปัญหาจะแสดงกรอบสีแดง
          พร้อมข้อความแจ้งเตือนเพื่อให้ผู้ใช้งานแก้ไข
        </p>

        <ul>
          <li>
            <strong>ชื่อ-นามสกุล</strong> — ต้องกรอกข้อมูล ไม่สามารถเว้นว่างได้
          </li>

          <li>
            <strong>รหัสนักศึกษา</strong> — ต้องกรอกเป็นตัวเลขจำนวน 10 หลัก
          </li>

          <li>
            <strong>คณะ</strong> — ต้องกรอกข้อมูล ไม่สามารถเว้นว่างได้
          </li>

          <li>
            <strong>อีเมล</strong> — ต้องอยู่ในรูปแบบอีเมลที่ถูกต้อง เช่น
            example@email.com
          </li>

          <li>
            <strong>เบอร์โทรศัพท์</strong> — ต้องเป็นตัวเลขจำนวน 10 หลัก
            และขึ้นต้นด้วย 0
          </li>

          <li>
            <strong>PDPA Consent</strong> — ต้องทำเครื่องหมายยินยอมก่อนลงทะเบียน
          </li>

          <li>
            <strong>กรณีเคยลงทะเบียนกิจกรรมแล้ว</strong> —
            หากรหัสนักศึกษาเคยลงทะเบียนกิจกรรมเดียวกัน
            ระบบจะแจ้งเตือนและไม่บันทึกข้อมูลซ้ำ
          </li>
        </ul>
      </>
    ),
  },

  {
    id: "success",
    number: "05",
    icon: BadgeCheck,
    title: "การลงทะเบียนสำเร็จและดูรายชื่อผู้ลงทะเบียน",
    shortDescription: "ตรวจสอบผลการลงทะเบียนและรายชื่อผู้เข้าร่วมกิจกรรม",
    image: manualSuccess,
    imageAlt: "ลงทะเบียนสำเร็จและหน้ารายชื่อผู้ลงทะเบียน",
    content: (
      <>
        <p>
          เมื่อกรอกข้อมูลครบถ้วนและกด “ยืนยันการลงทะเบียน”
          ระบบจะบันทึกข้อมูลและแสดงข้อความแจ้งผลการลงทะเบียน
        </p>

        <ul>
          <li>
            <strong>การลงทะเบียนสำเร็จ</strong> — ระบบจะแสดงหน้าต่าง
            “ลงทะเบียนสำเร็จ” เพื่อยืนยันว่าข้อมูลถูกบันทึกเรียบร้อยแล้ว
          </li>

          <li>
            <strong>การดูรายชื่อผู้ลงทะเบียน</strong> —
            สามารถเข้าสู่หน้ารายชื่อได้ 2 วิธี คือ หลังลงทะเบียนสำเร็จเมื่อกด
            “ตกลง” ระบบจะนำไปยังหน้ารายชื่อโดยอัตโนมัติ หรือกด
            “ดูรายชื่อผู้ลงทะเบียน” จากหน้ารายละเอียดกิจกรรม
          </li>

          <li>
            <strong>จำนวนผู้ลงทะเบียน</strong> —
            แสดงจำนวนผู้ลงทะเบียนเทียบกับจำนวนที่กิจกรรมรับได้
          </li>

          <li>
            <strong>ค้นหารายชื่อ</strong> —
            สามารถค้นหาผู้ลงทะเบียนด้วยชื่อหรือรหัสนักศึกษา
          </li>

          <li>
            <strong>การปกป้องข้อมูลส่วนบุคคล</strong> —
            อีเมลและเบอร์โทรศัพท์จะแสดงแบบปิดบังข้อมูลบางส่วน หรือ Data Masking
          </li>
        </ul>

        <div className="manual-data-example">
          <span>somchai@psu.ac.th → so***@psu.ac.th</span>
          <span>0812345678 → 081-xxx-5678</span>
        </div>
      </>
    ),
  },

  {
    id: "manual",
    number: "06",
    icon: BookOpen,
    title: "คู่มือการใช้งาน",
    shortDescription: "ศึกษาวิธีใช้งานระบบแต่ละขั้นตอนและดาวน์โหลดคู่มือ PDF",
    image: manualGuide,
    imageAlt: "หน้าคู่มือการใช้งาน",
    content: (
      <>
        <p>
          ผู้ใช้งานสามารถเข้าสู่หน้า “คู่มือการใช้งาน” จากเมนูด้านบนของเว็บไซต์
          เพื่อศึกษาขั้นตอนการใช้งานระบบพร้อมภาพประกอบ
        </p>

        <ul>
          <li>
            <strong>4 ขั้นตอนเริ่มต้น</strong> —
            แสดงภาพรวมตั้งแต่การค้นหากิจกรรม จนถึงการยืนยันการลงทะเบียน
          </li>

          <li>
            <strong>รายละเอียดแต่ละขั้นตอน</strong> —
            กดหัวข้อที่ต้องการเพื่อเปิดคำอธิบายและภาพประกอบ
          </li>

          <li>
            <strong>ภาพประกอบ</strong> —
            ใช้สำหรับช่วยอธิบายตำแหน่งปุ่มและส่วนต่าง ๆ ของเว็บไซต์
          </li>

          <li>
            <strong>ดาวน์โหลดคู่มือ PDF</strong> — สามารถดาวน์โหลดคู่มือฉบับ PDF
            สำหรับเปิดอ่านหรือเก็บไว้ใช้งานภายหลังได้
          </li>
        </ul>
      </>
    ),
  },

  {
    id: "contact",
    number: "07",
    icon: PhoneCall,
    title: "การติดต่อสอบถาม",
    shortDescription: "ดูข้อมูลหน่วยงาน ช่องทางติดต่อ และแผนที่",
    image: manualContact,
    imageAlt: "หน้าติดต่อสอบถาม",
    content: (
      <>
        <p>
          ผู้ใช้งานสามารถเข้าสู่หน้า “ติดต่อเรา” จากเมนูด้านบนของเว็บไซต์
          เพื่อดูข้อมูลสำหรับติดต่อหน่วยงานและตำแหน่งที่ตั้ง
        </p>

        <ul>
          <li>
            <strong>ข้อมูลหน่วยงาน</strong> — แสดงชื่อหน่วยงานที่รับผิดชอบ
          </li>

          <li>
            <strong>สถานที่ตั้ง</strong> —
            แสดงที่อยู่และรายละเอียดอาคารสำหรับการติดต่อ
          </li>

          <li>
            <strong>เบอร์โทรศัพท์</strong> —
            ใช้สำหรับติดต่อสอบถามข้อมูลเพิ่มเติม
          </li>

          <li>
            <strong>Facebook Fanpage</strong> —
            สามารถกดลิงก์เพื่อติดตามข่าวสารและประชาสัมพันธ์
          </li>

          <li>
            <strong>แผนที่และการเดินทาง</strong> — ตรวจสอบตำแหน่งที่ตั้ง
            และกดปุ่ม “ขอเส้นทางไปยังที่ทำการ” เพื่อเปิดเส้นทางสำหรับการเดินทาง
          </li>
        </ul>
      </>
    ),
  },
];

/* ============================================================
   COMPONENT
   ============================================================ */

function Manual() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => {
    setOpenSection((current) => (current === id ? null : id));
  };

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

          <div className="manual-hero__text">
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
        {/* =================================================
            4 STEPS
        ================================================= */}

        <div className="manual-section-heading">
          <span>ขั้นตอนการใช้งาน</span>

          <h2>เริ่มต้นใช้งานได้ง่าย ๆ ใน 4 ขั้นตอน</h2>

          <p>
            นักศึกษาสามารถค้นหาและลงทะเบียนกิจกรรมที่สนใจ ได้ตามขั้นตอนต่อไปนี้
          </p>
        </div>

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
            DETAIL / ACCORDION
        ================================================= */}

        <section className="manual-guide-section">
          <div className="manual-guide-heading">
            <div className="manual-guide-heading__left">
              <div className="manual-guide-heading__icon">
                <CircleHelp size={23} />
              </div>

              <div>
                <span>รายละเอียดเพิ่มเติม</span>

                <h2>คู่มือการใช้งานแต่ละขั้นตอน</h2>

                <p>เลือกหัวข้อที่ต้องการ เพื่อดูรายละเอียดและภาพประกอบ</p>
              </div>
            </div>

            <a
              href="/docs/User-Manual.pdf"
              download="User-Manual.pdf"
              className="manual-download-btn"
            >
              <Download size={18} />

              <span>ดาวน์โหลดคู่มือ PDF</span>
            </a>
          </div>

          <div className="manual-accordion">
            {manualSections.map((section) => {
              const Icon = section.icon;

              const isOpen = openSection === section.id;

              return (
                <article
                  key={section.id}
                  className={`manual-accordion-item ${
                    isOpen ? "manual-accordion-item--open" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="manual-accordion-button"
                    onClick={() => toggleSection(section.id)}
                    aria-expanded={isOpen}
                    aria-controls={`manual-panel-${section.id}`}
                  >
                    <div className="manual-accordion-number">
                      {section.number}
                    </div>

                    <div className="manual-accordion-icon">
                      <Icon size={21} />
                    </div>

                    <div className="manual-accordion-title">
                      <h3>{section.title}</h3>

                      <p>{section.shortDescription}</p>
                    </div>

                    <div
                      className={`manual-accordion-chevron ${
                        isOpen ? "manual-accordion-chevron--open" : ""
                      }`}
                    >
                      <ChevronDown size={21} />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`manual-panel-${section.id}`}
                      className="manual-accordion-content"
                    >
                      <div className="manual-accordion-description">
                        {section.content}
                      </div>

                      {section.image && (
                        <div className="manual-image-wrapper">
                          <img
                            src={section.image}
                            alt={section.imageAlt}
                            className="manual-guide-image"
                          />

                          <span className="manual-image-caption">
                            ภาพประกอบ — {section.title}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* =================================================
            NOTE
        ================================================= */}

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
