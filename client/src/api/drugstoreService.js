import http from '../utils/http';

export const getDrugstores = async () => {
  try {
    const response = await http.get('/api/drugstores');
    console.log("API Response:", response.data); // Log the response
    return response.data;
  } catch (error) {
    throw error;
  }
};
