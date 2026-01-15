import { API_BASE_URL } from "./api";

const API_URL = `${API_BASE_URL}/api/expenses`;

export async function getExpenses() {
  try {
    console.log("Calling API:", API_URL); // DEBUG (important)

    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch expenses");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API ERROR:", error);
    return [];
  }
}

