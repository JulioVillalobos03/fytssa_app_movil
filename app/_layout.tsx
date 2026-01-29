import { Stack } from "expo-router";
import { AuthProvider } from "../hooks/AuthContext";
import { LanguageProvider } from "../hooks/LanguageContext";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(public)" />
          <Stack.Screen name="(protected)" />
        </Stack>
      </AuthProvider>
    </LanguageProvider>
  );
}
