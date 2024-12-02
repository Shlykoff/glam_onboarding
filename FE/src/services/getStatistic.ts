import axios from "axios";

interface IStatisticResponse {
  started: number;
  finished: number;
  step: number[];
}

const url = import.meta.env.VITE_BACKEND_URL;

export const getStatistic = async (): Promise<IStatisticResponse> => {
  try {
    const response = await axios.get<IStatisticResponse>(url);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch statistic"
    );
  }
};
