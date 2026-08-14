import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// ========================================
// ACTIVITIES
// ========================================

export const getActivities = async (params = {}) => {
  const response = await api.get("/activities", {
    params,
  });

  return response;
};

export const getActivity = async (id) => {
  const response = await api.get(`/activities/${id}`);

  return response;
};

// ========================================
// REGISTRATIONS
// ========================================

// ดึงผู้ลงทะเบียนของกิจกรรม
//
// ไม่ใช้ ?activityId=
// เพราะ JSON Server ที่ใช้อยู่คืน [] เมื่อใช้ query นี้
//
// ดึงทั้งหมดก่อน แล้วกรองเอง
export const getRegistrations = async (activityId) => {
  const response = await api.get("/registrations");

  const registrations = Array.isArray(response.data) ? response.data : [];

  const filteredRegistrations = registrations.filter(
    (registration) => String(registration.activityId) === String(activityId),
  );

  console.log("กิจกรรมที่ต้องการ:", String(activityId));
  console.log("ผู้ลงทะเบียนทั้งหมด:", registrations);
  console.log("ผู้ลงทะเบียนของกิจกรรม:", filteredRegistrations);

  return {
    ...response,
    data: filteredRegistrations,
  };
};

// ========================================
// ตรวจสอบลงทะเบียนซ้ำ
// ========================================

export const checkRegistration = async (activityId, studentId) => {
  const response = await api.get("/registrations");

  const registrations = Array.isArray(response.data) ? response.data : [];

  const existingRegistrations = registrations.filter(
    (registration) =>
      String(registration.activityId) === String(activityId) &&
      String(registration.studentId) === String(studentId),
  );

  console.log("ตรวจสอบลงทะเบียนซ้ำ:", {
    activityId: String(activityId),
    studentId: String(studentId),
  });

  console.log("ผลการตรวจสอบ:", existingRegistrations);

  return {
    ...response,
    data: existingRegistrations,
  };
};

// ========================================
// CREATE REGISTRATION
// ========================================

export const createRegistration = async (data) => {
  const response = await api.post("/registrations", data);

  return response;
};

export default api;
