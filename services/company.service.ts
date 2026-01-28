import { API_BASE_URL } from "../constants/api";
import { Company } from "../types/company";

export async function getCompanies(): Promise<Company[]> {
  const res = await fetch(`${API_BASE_URL}/companies`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data.data;
}