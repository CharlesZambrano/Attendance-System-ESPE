import api from "./api";

export const getAttendance = async () => {
  try {
    const response = await api.get("/attendance");
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance:", error);
    throw error;
  }
};

// Agrega más funciones según sea necesario
