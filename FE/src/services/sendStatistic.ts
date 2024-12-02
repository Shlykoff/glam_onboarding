import axios from "axios";

type Onboarding = {
  isStarted?: boolean;
  step?: number;
  isFinished?: boolean;
};

const url = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendStatistic = async (data: Onboarding) => {
  try {
    await apiClient.post("/", data);
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
