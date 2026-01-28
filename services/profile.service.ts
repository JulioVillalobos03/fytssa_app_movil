import { API_BASE_URL } from "../constants/api";
import { getToken } from "./storage.service";

export async function getProfile() {
  const token = await getToken();

  const res = await fetch(`${API_BASE_URL}/profile/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) throw data;

  return data.data.data;
}



export async function updateProfile(payload: {
  name: string;
  email: string;
  avatar?: string | null;
}) {
  const token = await getToken();

  const form = new FormData();

  form.append("name", payload.name);
  form.append("email", payload.email);

  if (payload.avatar && !payload.avatar.startsWith("blob:")) {
  form.append("avatar", {
    uri: payload.avatar,
    name: "avatar.jpg",
    type: "image/jpeg",
  } as any);
}


  const res = await fetch(`${API_BASE_URL}/profile/me`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: form,
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data.data;
}
