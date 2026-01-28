import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  token: "@token",
  companyCode: "@company_code",
  companyColor: "@company_color",
  user: "@user",
};

const LANGUAGE_KEY = "lang";

export async function setLanguage(lang: "es" | "en") {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
}

export async function getLanguage() {
  return await AsyncStorage.getItem(LANGUAGE_KEY);
}

export async function setToken(token: string) {
  await AsyncStorage.setItem(KEYS.token, token);
}

export async function getToken() {
  const t = await AsyncStorage.getItem(KEYS.token);
  return t;
}

export async function setUser(user: any) {
  if (!user) {
    return;
  }
  await AsyncStorage.setItem(KEYS.user, JSON.stringify(user));
}

export async function getUser() {
  const u = await AsyncStorage.getItem(KEYS.user);

  if (!u || u === "undefined") return null;

  try {
    const parsed = JSON.parse(u);
    return parsed;
  } catch (e) {
    return e;
  }
}


export async function clearSession() {
  await AsyncStorage.multiRemove([
    KEYS.token,
    KEYS.user,
    KEYS.companyCode,
    KEYS.companyColor,
  ]);
}

export async function setCompanySelection(code: string, color: string) {
  await AsyncStorage.multiSet([
    [KEYS.companyCode, code],
    [KEYS.companyColor, color],
  ]);
}

export async function getCompanySelection() {
  const pairs = await AsyncStorage.multiGet([KEYS.companyCode, KEYS.companyColor]);
  const obj: any = {};
  pairs.forEach(([k, v]) => (obj[k] = v));
  return {
    code: obj[KEYS.companyCode] || null,
    color: obj[KEYS.companyColor] || null,
  };
}
