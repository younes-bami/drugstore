import http from '../utils/http';

export const getDrugstores = async (latitude, longitude) => {
    try {
    const response = await http.get(`/api/drugstores?lat=${latitude}&lng=${longitude}`);
    console.log("API Response:", response.data); // Log the response
    return response.data;
  } catch (error) {
    throw error;
  }
};

