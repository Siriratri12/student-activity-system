import React from "react";
import {
  Building2,
  MapPinned,
  Phone,
  Navigation,
  ExternalLink,
} from "lucide-react";

import "./ContactPage.css";

const ContactPage = () => {
  return (
    <main className="contact-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="contact-hero">
        <div className="contact-container contact-hero__inner">
          <div className="contact-hero__icon">
            <Building2 size={28} />
          </div>

          <div>
            <span className="contact-hero__eyebrow">CONTACT US</span>

            <h1>ติดต่อสอบถาม</h1>

            <p>
              ข้อมูลการติดต่อ สถานที่ตั้ง และช่องทางข่าวสาร ของงานพัฒนานักศึกษา
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="contact-container contact-content">
        <div className="contact-layout">
          {/* =================================================
              LEFT
          ================================================= */}

          <div className="contact-info-column">
            {/* หน่วยงาน */}

            <article className="contact-card contact-card--featured">
              <div className="contact-icon-box">
                <Building2 size={25} strokeWidth={2.1} />
              </div>

              <div className="contact-card__content">
                <span className="contact-label">หน่วยงาน</span>

                <h2>งานพัฒนานักศึกษา</h2>

                <p className="contact-card__primary">
                  กองพัฒนานักศึกษาและศิษย์เก่าสัมพันธ์ วิทยาเขตหาดใหญ่
                </p>

                <div className="contact-card__english">
                  <p>Student Development Section</p>

                  <p>Student Development and Alumni Division, Hat Yai Campus</p>
                </div>
              </div>
            </article>

            {/* สถานที่ */}

            <article className="contact-card">
              <div className="contact-icon-box">
                <MapPinned size={24} strokeWidth={2.1} />
              </div>

              <div className="contact-card__content">
                <span className="contact-label">สถานที่ตั้ง</span>

                <h2>มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่</h2>

                <div className="contact-address">
                  <p>ชั้น 2 อาคารสำนักงานอธิการบดี</p>

                  <p>15 ถ.กาญจนวณิชย์ ต.คอหงส์ อ.หาดใหญ่ จ.สงขลา 90110</p>
                </div>

                <div className="contact-card__english">
                  <p>Prince of Songkla University, Hat Yai Campus</p>

                  <p>2nd Fl., President&apos;s Office Building</p>

                  <p>
                    15 Kanchanawanich Rd., Hat Yai, Songkhla, Thailand 90110
                  </p>
                </div>
              </div>
            </article>

            {/* โทรศัพท์ */}

            <article className="contact-card">
              <div className="contact-icon-box">
                <Phone size={23} strokeWidth={2.1} />
              </div>

              <div className="contact-card__content">
                <span className="contact-label">โทรศัพท์</span>

                <h2>เบอร์โทรศัพท์</h2>

                <div className="contact-phone-list">
                  <div className="contact-phone-row">
                    <span>เบอร์โทรศัพท์</span>

                    <a href="tel:074282209">0 7428 2209</a>
                  </div>

                  <div className="contact-phone-row">
                    <span>Office Phone No.</span>

                    <a href="tel:+6674282209">+66 (0) 7428 2209</a>
                  </div>
                </div>
              </div>
            </article>

            {/* Facebook */}

            <article className="contact-card contact-card--social">
              <div className="contact-icon-box contact-icon-box--facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </div>

              <div className="contact-card__content">
                <span className="contact-label">SOCIAL MEDIA</span>

                <h2>Facebook Fanpage</h2>

                <a
                  href="https://www.facebook.com/psusds/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link"
                >
                  งานพัฒนานักศึกษา ม.อ. หาดใหญ่
                  <ExternalLink size={16} />
                </a>
              </div>
            </article>
          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <aside className="contact-map-card">
            <div className="contact-map-card__header">
              <div>
                <span className="contact-label">LOCATION</span>

                <h2>แผนที่และการเดินทาง</h2>
              </div>

              <div className="contact-map-icon">
                <MapPinned size={22} />
              </div>
            </div>

            <div className="contact-map-wrapper">
              <iframe
                title="Prince of Songkla University Hat Yai Campus"
                src="https://www.google.com/maps?q=Prince%20of%20Songkla%20University%20Hat%20Yai&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Prince+of+Songkla+University+Hat+Yai"
              target="_blank"
              rel="noopener noreferrer"
              className="direction-btn"
            >
              <Navigation size={18} />
              ขอเส้นทางไปยังที่ทำการ
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
