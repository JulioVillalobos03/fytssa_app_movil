import { API_BASE_URL } from "../constants/api";
import { getToken } from "./storage.service";

type ApiFetchOptions = RequestInit & {
  auth?: boolean;
};

export async function apiFetch<T>(endpoint: string, options: ApiFetchOptions = {}) {
  const { auth = false, headers, ...rest } = options;
  const token = auth ? await getToken() : null;
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...rest,
      headers: {
        Accept: "application/json",
        ...(rest.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(headers || {}),
      },
    });

    const text = await res.text();
    let data: any = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!res.ok) {
      throw data || { success: false, code: "UNKNOWN_ERROR" };
    }

    return data as T;
  } catch (err: any) {
    throw err;
  }
}
