import { apiFetch } from "./api";
import { clearSession, setToken, setUser } from "./storage.service";

interface LoginPayload {
  company_code: string;
  email: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  const response = await apiFetch<any>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response?.data?.token || !response?.data?.user) {
    throw {
      code: "AUTH_INVALID_RESPONSE",
      message: "Invalid login response structure",
      response,
    };
  }

  await setToken(response.data.token);
  await setUser(response.data.user);

  return response.data.user;
}

export async function register(payload: {
  company_code: string;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  const response = await apiFetch<any>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  // 🔐 validar estructura real del backend
  if (!response?.data?.token || !response?.data?.user) {
    throw {
      code: response?.code || "AUTH_INVALID_RESPONSE",
      message: "Invalid register response structure",
      response,
    };
  }
  
  return response.data.user;
}


export async function logout() {
  try {
    await apiFetch("/auth/logout", {
      method: "POST",
      auth: true,
    });
  } finally {
    await clearSession();
  }
}
