import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, CalendarDays, Clock3, MapPin, Users } from "lucide-react";

import { getActivity } from "../services/api";

import "./ActivityDetail.css";

function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // LOAD ACTIVITY
  // ========================================

  const fetchActivity = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getActivity(id);

      setActivity(response.data);
    } catch (err) {
      console.error("โหลดรายละเอียดกิจกรรมไม่สำเร็จ:", err);

      setError("ไม่สามารถโหลดรายละเอียดกิจกรรมได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      setError("ไม่พบรหัสกิจกรรม");
      setLoading(false);

      return;
    }

    fetchActivity();
  }, [id]);

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <main className="activity-detail-page">
        <div className="status-message">กำลังโหลดรายละเอียดกิจกรรม...</div>
      </main>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error || !activity) {
    return (
      <main className="activity-detail-page">
        <div className="status-message status-message--error">
          <p>{error || "ไม่พบกิจกรรมนี้"}</p>

          <div className="activity-error-actions">
            <button
              type="button"
              className="retry-button"
              onClick={fetchActivity}
            >
              ลองใหม่
            </button>

            <button
              type="button"
              className="activity-error-back"
              onClick={() => navigate("/activities")}
            >
              กลับหน้ากิจกรรม
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ========================================
  // DATE / TIME
  // ========================================

  const date = new Date(activity.date);

  const formattedDate = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // ========================================
  // UI
  // ========================================

  return (
    <main className="activity-detail-page">
      {/* ========================================
          HEADER
      ======================================== */}

      <section className="activity-heading">
        <button
          type="button"
          className="activity-back-icon"
          onClick={() => navigate("/activities")}
          aria-label="กลับหน้ารายการกิจกรรม"
          title="กลับหน้ารายการกิจกรรม"
        >
          <ArrowLeft size={21} />
        </button>

        <div className="activity-heading__line" />

        <div className="activity-heading__content">
          <h1>รายละเอียดกิจกรรม</h1>

          <p>ข้อมูลกิจกรรม วันเวลา สถานที่ และรายละเอียดการลงทะเบียน</p>
        </div>
      </section>

      {/* ========================================
          MAIN CARD
      ======================================== */}

      <section className="activity-top-card">
        <div className="activity-top-layout">
          {/* ========================================
              LEFT SIDE
          ======================================== */}

          <div className="activity-info-side">
            <span className="activity-category-badge">
              {activity.category || "กิจกรรม"}
            </span>

            <h2>{activity.title}</h2>

            {/* ========================================
                ACTIVITY META
            ======================================== */}

            <div className="activity-meta-list">
              <div className="meta-row">
                <div className="meta-icon">
                  <CalendarDays size={19} />
                </div>

                <div className="meta-content">
                  <span className="meta-label">วันที่</span>

                  <strong>{formattedDate}</strong>
                </div>
              </div>

              <div className="meta-row">
                <div className="meta-icon">
                  <Clock3 size={19} />
                </div>

                <div className="meta-content">
                  <span className="meta-label">เวลา</span>

                  <strong>{formattedTime} น.</strong>
                </div>
              </div>

              <div className="meta-row">
                <div className="meta-icon">
                  <MapPin size={19} />
                </div>

                <div className="meta-content">
                  <span className="meta-label">สถานที่</span>

                  <strong>{activity.location || "ไม่ระบุสถานที่"}</strong>
                </div>
              </div>

              <div className="meta-row">
                <div className="meta-icon">
                  <Users size={19} />
                </div>

                <div className="meta-content">
                  <span className="meta-label">จำนวนที่รับ</span>

                  <strong>{activity.capacity || 0} คน</strong>
                </div>
              </div>
            </div>

            {/* ========================================
                ACTION BUTTONS
            ======================================== */}

            <div className="activity-top-actions">
              <button
                type="button"
                className="btn-register"
                onClick={() => navigate(`/activities/${activity.id}/register`)}
              >
                ลงทะเบียนเข้าร่วมกิจกรรม
              </button>

              <button
                type="button"
                className="btn-participants"
                onClick={() =>
                  navigate(`/activities/${activity.id}/registrations`)
                }
              >
                ดูรายชื่อผู้ลงทะเบียน
              </button>
            </div>
          </div>

          {/* ========================================
              RIGHT SIDE IMAGE
          ======================================== */}

          <div className="activity-image-side">
            {activity.imageUrl ? (
              <img src={activity.imageUrl} alt={activity.title} />
            ) : (
              <div className="activity-image-placeholder">
                <Users size={40} />

                <span>ไม่มีรูปภาพกิจกรรม</span>
              </div>
            )}
          </div>
        </div>

        {/* ========================================
            DESCRIPTION
        ======================================== */}

        <section className="activity-inner-description">
          <div className="activity-inner-description__title">
            <span />

            <h2>รายละเอียดกิจกรรม</h2>
          </div>

          <p>{activity.description || "ไม่มีรายละเอียดกิจกรรม"}</p>
        </section>
      </section>
    </main>
  );
}

export default ActivityDetail;
