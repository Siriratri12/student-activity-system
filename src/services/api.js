// src/services/api.js

import axios from "axios";

// ========================================
// API BASE URL
// ========================================
//
// Local:
// VITE_API_URL=http://localhost:3001
//
// Production:
// VITE_API_URL=https://your-api-url.com
//

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
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

// ดึงผู้ลงทะเบียนทั้งหมดก่อน
// แล้วกรองเฉพาะ activityId ที่ต้องการ
export const getRegistrations = async (activityId) => {
  const response = await api.get("/registrations");

  const registrations = Array.isArray(response.data) ? response.data : [];

  const filteredRegistrations = registrations.filter(
    (registration) => String(registration.activityId) === String(activityId),
  );

  return {
    ...response,
    data: filteredRegistrations,
  };
};

// ========================================
// CHECK DUPLICATE REGISTRATION
// ========================================

// ตรวจสอบว่า studentId นี้
// ลงทะเบียนกิจกรรมนี้ไปแล้วหรือยัง
export const checkRegistration = async (activityId, studentId) => {
  const response = await api.get("/registrations");

  const registrations = Array.isArray(response.data) ? response.data : [];

  const existingRegistrations = registrations.filter(
    (registration) =>
      String(registration.activityId) === String(activityId) &&
      String(registration.studentId) === String(studentId),
  );

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
