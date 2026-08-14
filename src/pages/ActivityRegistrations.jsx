import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Search,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  ShieldCheck,
} from "lucide-react";

import { getActivity, getRegistrations } from "../services/api";

import "./ActivityRegistrations.css";

// ========================================
// Data Masking
// ========================================

const maskEmail = (email) => {
  if (!email) {
    return "ไม่ระบุ";
  }

  const [username, domain] = String(email).split("@");

  if (!username || !domain) {
    return "ข้อมูลไม่ถูกต้อง";
  }

  // username มี 1 ตัว เช่น a@psu.ac.th
  if (username.length === 1) {
    return `${username}***@${domain}`;
  }

  // username มี 2 ตัว เช่น aa@psu.ac.th
  // แสดงเฉพาะตัวแรก
  if (username.length === 2) {
    return `${username.slice(0, 1)}***@${domain}`;
  }

  // username มากกว่า 2 ตัว
  // แสดงเพียง 2 ตัวแรก
  return `${username.slice(0, 2)}***@${domain}`;
};

const maskPhone = (phone) => {
  if (!phone) {
    return "ไม่ระบุ";
  }

  const cleanPhone = String(phone).replace(/\D/g, "");

  if (cleanPhone.length !== 10) {
    return "ข้อมูลไม่ถูกต้อง";
  }

  return `${cleanPhone.slice(0, 3)}-xxx-${cleanPhone.slice(-4)}`;
};

// ========================================
// Component
// ========================================

function ActivityRegistrations() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;

  // ========================================
  // โหลดข้อมูล
  // ========================================

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [activityResponse, registrationResponse] = await Promise.all([
        getActivity(id),
        getRegistrations(id),
      ]);

      setActivity(activityResponse.data);

      setRegistrations(
        Array.isArray(registrationResponse.data)
          ? registrationResponse.data
          : [],
      );
    } catch (err) {
      console.error("โหลดข้อมูลผู้ลงทะเบียนไม่สำเร็จ:", err);

      setError("ไม่สามารถโหลดข้อมูลผู้ลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง");
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

    fetchData();
  }, [id]);

  // ========================================
  // Search
  // ========================================

  const filteredRegistrations = registrations.filter((item) => {
    const term = searchTerm.trim().toLowerCase();

    const name = String(item.fullName || "").toLowerCase();
    const studentId = String(item.studentId || "").toLowerCase();

    return name.includes(term) || studentId.includes(term);
  });

  // ========================================
  // Pagination
  // ========================================

  const totalPages =
    Math.ceil(filteredRegistrations.length / itemsPerPage) || 1;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentRegistrations = filteredRegistrations.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // ========================================
  // Loading
  // ========================================

  if (loading) {
    return (
      <main className="registrations-page">
        <div className="status-message">กำลังโหลดข้อมูลผู้ลงทะเบียน...</div>
      </main>
    );
  }

  // ========================================
  // Error
  // ========================================

  if (error) {
    return (
      <main className="registrations-page">
        <div className="status-message status-message--error">
          <p>{error}</p>

          <div className="registration-error-actions">
            <button type="button" className="retry-button" onClick={fetchData}>
              ลองใหม่
            </button>

            <button
              type="button"
              className="registration-error-back"
              onClick={() => navigate(`/activities/${id}`)}
            >
              กลับหน้ารายละเอียด
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ========================================
  // Date / Time
  // ========================================

  const activityDateFormatted = activity?.date
    ? new Date(activity.date).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const activityTimeFormatted = activity?.date
    ? new Date(activity.date).toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  // ========================================
  // UI
  // ========================================

  return (
    <main className="registrations-page">
      {/* ========================================
          HEADER
      ======================================== */}

      <section className="registrations-heading">
        <button
          type="button"
          className="registrations-back-icon"
          onClick={() => navigate(`/activities/${id}`)}
          aria-label="ย้อนกลับ"
          title="ย้อนกลับ"
        >
          <ArrowLeft size={21} />
        </button>

        <div className="registrations-heading-line" />

        <div className="registrations-heading-content">
          <h1>รายชื่อผู้ลงทะเบียน</h1>

          <p>ตรวจสอบรายชื่อผู้เข้าร่วมกิจกรรม และค้นหาข้อมูลผู้ลงทะเบียน</p>
        </div>
      </section>

      {/* ========================================
          ACTIVITY HERO
      ======================================== */}

      {activity && (
        <section className="registrations-hero">
          <div className="registrations-hero__main">
            {/* รูปกิจกรรม */}

            <div className="registrations-hero__image">
              {activity.imageUrl ? (
                <img src={activity.imageUrl} alt={activity.title} />
              ) : (
                <Users size={28} />
              )}
            </div>

            {/* ข้อมูลกิจกรรม */}

            <div className="registrations-hero__content">
              <span className="registrations-category">
                {activity.category || "กิจกรรม"}
              </span>

              <h2>{activity.title}</h2>

              <div className="registrations-hero__meta">
                {activityDateFormatted && (
                  <div>
                    <CalendarDays size={16} />

                    <span>{activityDateFormatted}</span>
                  </div>
                )}

                {activityTimeFormatted && (
                  <div>
                    <Clock3 size={16} />

                    <span>{activityTimeFormatted} น.</span>
                  </div>
                )}

                {activity.location && (
                  <div>
                    <MapPin size={16} />

                    <span>{activity.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* จำนวนผู้ลงทะเบียน */}

          <div className="registrations-count-card">
            <div className="registrations-count-icon">
              <Users size={21} />
            </div>

            <div>
              <span>ผู้ลงทะเบียนทั้งหมด</span>

              <strong>
                {registrations.length}

                <small> / {activity.capacity || 0} คน</small>
              </strong>
            </div>
          </div>
        </section>
      )}

      {/* ========================================
          TABLE CARD
      ======================================== */}

      <section className="registrations-card">
        {/* ========================================
            SEARCH
        ======================================== */}

        <div className="registrations-search-area">
          <div className="search-container">
            <Search size={18} className="search-icon" />

            <input
              type="text"
              className="search-input"
              placeholder="ค้นหาชื่อ หรือ รหัสนักศึกษา..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* ========================================
            EMPTY STATE
        ======================================== */}

        {filteredRegistrations.length === 0 ? (
          <div className="registrations-empty">
            <div className="registrations-empty__icon">
              <Users size={28} />
            </div>

            <h3>
              {registrations.length === 0
                ? "ยังไม่มีผู้ลงทะเบียน"
                : "ไม่พบข้อมูลที่ค้นหา"}
            </h3>

            <p>
              {registrations.length === 0
                ? "กิจกรรมนี้ยังไม่มีนักศึกษาลงทะเบียน"
                : "ลองเปลี่ยนชื่อหรือรหัสนักศึกษาแล้วค้นหาใหม่อีกครั้ง"}
            </p>
          </div>
        ) : (
          <>
            {/* ========================================
                TABLE
            ======================================== */}

            <div className="registration-table-wrapper">
              <table className="registration-table">
                <thead>
                  <tr>
                    <th className="registration-col-number">ลำดับ</th>

                    <th>ชื่อ - นามสกุล</th>

                    <th>รหัสนักศึกษา</th>

                    <th>คณะ</th>

                    <th>อีเมล</th>

                    <th>เบอร์โทร</th>
                  </tr>
                </thead>

                <tbody>
                  {currentRegistrations.map((registration, index) => (
                    <tr
                      key={
                        registration.id || `${registration.studentId}-${index}`
                      }
                    >
                      {/* ลำดับ */}

                      <td className="registration-number">
                        {indexOfFirstItem + index + 1}
                      </td>

                      {/* ชื่อ */}

                      <td>
                        <strong className="registration-fullname">
                          {registration.fullName || "ไม่ระบุ"}
                        </strong>
                      </td>

                      {/* Student ID */}

                      <td>{registration.studentId || "ไม่ระบุ"}</td>

                      {/* Faculty */}

                      <td>{registration.faculty || "ไม่ระบุ"}</td>

                      {/* Email - Data Masking */}

                      <td>
                        <span className="registration-private">
                          {maskEmail(registration.email)}
                        </span>
                      </td>

                      {/* Phone - Data Masking */}

                      <td>
                        <span className="registration-private">
                          {maskPhone(registration.phone)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ========================================
                PAGINATION
            ======================================== */}

            {totalPages > 1 && (
              <div className="pagination-container">
                {/* Previous */}

                <button
                  type="button"
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="หน้าก่อนหน้า"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Page Numbers */}

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((number) => (
                  <button
                    type="button"
                    key={number}
                    className={`pagination-btn ${
                      currentPage === number ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(number)}
                  >
                    {number}
                  </button>
                ))}

                {/* Next */}

                <button
                  type="button"
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="หน้าถัดไป"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ========================================
          PRIVACY NOTICE
      ======================================== */}

      <div className="registrations-notice">
        <div className="registrations-notice__icon">
          <ShieldCheck size={19} />
        </div>

        <div>
          <strong>การคุ้มครองข้อมูลส่วนบุคคล</strong>

          <p>
            ข้อมูลอีเมลและเบอร์โทรศัพท์ถูกปิดบังบางส่วน
            เพื่อคุ้มครองความเป็นส่วนตัวของผู้ลงทะเบียน
          </p>
        </div>
      </div>
    </main>
  );
}

export default ActivityRegistrations;
