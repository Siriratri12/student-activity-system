import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Lock,
  AlertCircle,
  CheckCircle,
  UserRound,
} from "lucide-react";

import {
  getActivity,
  createRegistration,
  checkRegistration,
} from "../services/api";

import "./ActivityRegister.css";

function ActivityRegister() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    type: "error",
    message: "",
  });

  const [form, setForm] = useState({
    fullName: "",
    studentId: "",
    faculty: "",
    email: "",
    phone: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});

  // ========================================
  // โหลดข้อมูลกิจกรรม
  // ========================================

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);

        const response = await getActivity(id);

        setActivity(response.data);
      } catch (err) {
        console.error("โหลดกิจกรรมไม่สำเร็จ:", err);

        setModal({
          open: true,
          type: "error",
          message: "ไม่สามารถโหลดข้อมูลกิจกรรมได้",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchActivity();
    }
  }, [id]);

  // ========================================
  // Input ทั่วไป
  // ========================================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  // ========================================
  // Student ID
  // ========================================

  const handleStudentIdChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 10);

    setForm((previous) => ({
      ...previous,
      studentId: value,
    }));

    if (errors.studentId) {
      setErrors((previous) => ({
        ...previous,
        studentId: "",
      }));
    }
  };

  // ========================================
  // Phone
  // ========================================

  const handlePhoneChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 10);

    setForm((previous) => ({
      ...previous,
      phone: value,
    }));

    if (errors.phone) {
      setErrors((previous) => ({
        ...previous,
        phone: "",
      }));
    }
  };

  // ========================================
  // Validation
  // ========================================

  const validateForm = () => {
    const newErrors = {};

    const fullName = form.fullName.trim();
    const studentId = form.studentId.trim();
    const faculty = form.faculty.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (!fullName) {
      newErrors.fullName = "กรุณากรอกชื่อ-นามสกุล";
    }

    if (!studentId) {
      newErrors.studentId = "กรุณากรอกรหัสนักศึกษา";
    } else if (!/^\d{10}$/.test(studentId)) {
      newErrors.studentId = "รหัสนักศึกษาต้องเป็นตัวเลข 10 หลัก";
    }

    if (!faculty) {
      newErrors.faculty = "กรุณากรอกคณะ";
    }

    if (!email) {
      newErrors.email = "กรุณากรอกอีเมล";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }

    if (!phone) {
      newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์";
    } else if (!/^0\d{9}$/.test(phone)) {
      newErrors.phone = "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก และขึ้นต้นด้วย 0";
    }

    if (!form.consent) {
      newErrors.consent = "กรุณายอมรับเงื่อนไขการลงทะเบียน";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ========================================
  // Submit
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    const fullName = form.fullName.trim();
    const studentId = form.studentId.trim();
    const faculty = form.faculty.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    try {
      setSubmitting(true);

      // ----------------------------------------
      // ตรวจสอบการลงทะเบียนซ้ำ
      // ----------------------------------------

      const duplicateResponse = await checkRegistration(id, studentId);

      const existingRegistrations = Array.isArray(duplicateResponse.data)
        ? duplicateResponse.data
        : [];

      if (existingRegistrations.length > 0) {
        setModal({
          open: true,
          type: "error",
          message: "รหัสนักศึกษานี้ลงทะเบียนกิจกรรมนี้ไปแล้ว",
        });

        return;
      }

      // ----------------------------------------
      // เตรียมข้อมูล
      // ----------------------------------------

      const registrationData = {
        activityId: String(id),
        fullName,
        studentId,
        faculty,
        email,
        phone,
        consent: true,
        registeredAt: new Date().toISOString(),
      };

      // ----------------------------------------
      // บันทึก
      // ----------------------------------------

      await createRegistration(registrationData);

      // ----------------------------------------
      // Success Popup
      // ----------------------------------------

      setModal({
        open: true,
        type: "success",
        message: "ลงทะเบียนกิจกรรมสำเร็จเรียบร้อยแล้ว",
      });
    } catch (err) {
      console.error("ลงทะเบียนไม่สำเร็จ:", err);

      setModal({
        open: true,
        type: "error",
        message:
          "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์เพื่อบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ========================================
  // Popup OK
  // ========================================

  // const handleModalOk = () => {
  //   console.log("กดตกลงแล้ว");
  //   console.log("modal.type =", modal.type);
  //   console.log("activity id =", id);

  //   if (modal.type === "success") {
  //     const targetUrl = `http://localhost:5173/activities/${id}/registrations`;

  //     console.log("กำลังไป =", targetUrl);

  //     window.location.replace(targetUrl);

  //     return;
  //   }

  //   setModal({
  //     open: false,
  //     type: "error",
  //     message: "",
  //   });
  // };

  const handleModalOk = () => {
    if (modal.type === "success") {
      navigate(`/activities/${id}/registrations`);
      return;
    }

    setModal({
      open: false,
      type: "error",
      message: "",
    });
  };

  // ========================================
  // Loading
  // ========================================

  if (loading) {
    return (
      <main className="activity-register-page">
        <div className="status-message">กำลังโหลดข้อมูลกิจกรรม...</div>
      </main>
    );
  }

  // ========================================
  // ไม่พบกิจกรรม
  // ========================================

  if (!activity) {
    return (
      <main className="activity-register-page">
        <div className="status-message status-message--error">
          <p>ไม่พบกิจกรรมนี้</p>

          <button
            type="button"
            className="retry-button"
            onClick={() => navigate("/activities")}
          >
            กลับหน้ากิจกรรม
          </button>
        </div>
      </main>
    );
  }

  // ========================================
  // วันที่ / เวลา
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
    <main className="activity-register-page">
      {/* MODAL */}

      {modal.open && (
        <div className="reg-modal-overlay">
          <div className="reg-modal-content">
            <div
              className={`reg-modal-icon-wrapper ${
                modal.type === "success"
                  ? "reg-modal-icon-wrapper--success"
                  : "reg-modal-icon-wrapper--error"
              }`}
            >
              {modal.type === "success" ? (
                <CheckCircle size={34} />
              ) : (
                <AlertCircle size={34} />
              )}
            </div>

            <h3>
              {modal.type === "success" ? "ลงทะเบียนสำเร็จ" : "แจ้งเตือน"}
            </h3>

            <p>{modal.message}</p>

            {modal.type === "success" && (
              <span className="reg-modal-hint">
                กดตกลงเพื่อดูรายชื่อผู้ลงทะเบียน
              </span>
            )}

            <button
              type="button"
              className="reg-modal-btn"
              onClick={handleModalOk}
            >
              ตกลง
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}

      <section className="reg-page-heading">
        <button
          type="button"
          className="reg-back-icon"
          onClick={() => navigate(`/activities/${id}`)}
          aria-label="ย้อนกลับ"
          title="ย้อนกลับ"
        >
          <ArrowLeft size={21} />
        </button>

        <div className="reg-heading-line" />

        <div className="reg-heading-content">
          <h1>ลงทะเบียนเข้าร่วมกิจกรรม</h1>

          <p>กรอกข้อมูลให้ครบถ้วนเพื่อยืนยันการเข้าร่วมกิจกรรม</p>
        </div>
      </section>

      {/* ACTIVITY SUMMARY */}

      <section className="reg-activity-summary">
        <div className="reg-activity-summary__header">
          <span className="reg-category">{activity.category || "กิจกรรม"}</span>

          <h2>{activity.title}</h2>
        </div>

        <div className="reg-activity-meta">
          <div className="reg-meta-item">
            <div className="reg-meta-icon">
              <CalendarDays size={19} />
            </div>

            <div>
              <span>วันที่</span>
              <strong>{formattedDate}</strong>
            </div>
          </div>

          <div className="reg-meta-item">
            <div className="reg-meta-icon">
              <Clock3 size={19} />
            </div>

            <div>
              <span>เวลา</span>
              <strong>{formattedTime} น.</strong>
            </div>
          </div>

          <div className="reg-meta-item">
            <div className="reg-meta-icon">
              <MapPin size={19} />
            </div>

            <div>
              <span>สถานที่</span>
              <strong>{activity.location}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}

      <section className="reg-card-container">
        <div className="reg-form-heading">
          <div className="reg-form-heading__icon">
            <UserRound size={21} />
          </div>

          <div>
            <h2>ข้อมูลผู้ลงทะเบียน</h2>

            <p>กรุณากรอกข้อมูลของผู้เข้าร่วมกิจกรรม</p>
          </div>
        </div>

        <form className="reg-form-layout" onSubmit={handleSubmit} noValidate>
          {/* ชื่อ */}

          <div className="reg-group">
            <label htmlFor="fullName">
              ชื่อ - นามสกุล <span>*</span>
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="กรอกชื่อและนามสกุล"
              value={form.fullName}
              onChange={handleChange}
              className={errors.fullName ? "reg-input-error" : ""}
            />

            {errors.fullName && (
              <span className="reg-error-text">{errors.fullName}</span>
            )}
          </div>

          {/* Student ID */}

          <div className="reg-group">
            <label htmlFor="studentId">
              รหัสนักศึกษา <span>*</span>
            </label>

            <input
              id="studentId"
              name="studentId"
              type="text"
              inputMode="numeric"
              maxLength={10}
              placeholder="ตัวอย่าง: 6712345678"
              value={form.studentId}
              onChange={handleStudentIdChange}
              className={errors.studentId ? "reg-input-error" : ""}
            />

            {errors.studentId && (
              <span className="reg-error-text">{errors.studentId}</span>
            )}
          </div>

          {/* Faculty */}

          <div className="reg-group">
            <label htmlFor="faculty">
              คณะ <span>*</span>
            </label>

            <input
              id="faculty"
              name="faculty"
              type="text"
              placeholder="เช่น คณะวิศวกรรมศาสตร์"
              value={form.faculty}
              onChange={handleChange}
              className={errors.faculty ? "reg-input-error" : ""}
            />

            {errors.faculty && (
              <span className="reg-error-text">{errors.faculty}</span>
            )}
          </div>

          {/* Email */}

          <div className="reg-group">
            <label htmlFor="email">
              อีเมล <span>*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "reg-input-error" : ""}
            />

            {errors.email && (
              <span className="reg-error-text">{errors.email}</span>
            )}
          </div>

          {/* Phone */}

          <div className="reg-group reg-group--full">
            <label htmlFor="phone">
              เบอร์โทรศัพท์ <span>*</span>
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="0812345678"
              value={form.phone}
              onChange={handlePhoneChange}
              className={errors.phone ? "reg-input-error" : ""}
            />

            {errors.phone && (
              <span className="reg-error-text">{errors.phone}</span>
            )}
          </div>

          {/* PDPA */}

          <div className="reg-pdpa-box reg-group--full">
            <div className="reg-pdpa-title">
              <Lock size={18} />

              <h3>ความยินยอมในการเก็บรวบรวมและใช้ข้อมูลส่วนบุคคล (PDPA)</h3>
            </div>

            <label className="reg-consent-label">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
              />

              <span>
                ข้าพเจ้ายินยอมให้มหาวิทยาลัยสงขลานครินทร์ เก็บรวบรวม ใช้
                และเปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้า
                เพื่อวัตถุประสงค์ในการบริหารจัดการกิจกรรม
                และการสื่อสารที่เกี่ยวข้องตามนโยบายคุ้มครองข้อมูลส่วนบุคคล
                (PDPA) ของมหาวิทยาลัย
              </span>
            </label>

            {errors.consent && (
              <span className="reg-error-text reg-consent-error">
                {errors.consent}
              </span>
            )}
          </div>

          {/* ACTIONS */}

          <div className="reg-actions reg-group--full">
            <button
              type="button"
              className="reg-btn-cancel"
              onClick={() => navigate(`/activities/${id}`)}
              disabled={submitting}
            >
              ยกเลิก
            </button>

            <button
              type="submit"
              className="reg-btn-submit"
              disabled={submitting}
            >
              {submitting ? "กำลังบันทึก..." : "ยืนยันการลงทะเบียน"}
            </button>
          </div>
        </form>
      </section>

      {/* SECURITY */}

      <div className="reg-security-footer">
        <Lock size={17} />

        <span>ข้อมูลของคุณจะถูกเก็บรักษาอย่างปลอดภัย</span>
      </div>
    </main>
  );
}

export default ActivityRegister;
