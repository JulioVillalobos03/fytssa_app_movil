import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../hooks/AuthContext";
import { Loader } from "../../components/ui/Loader";

export default function ProtectedLayout() {
  const { loading, authenticated } = useAuth();

  if (loading) return <Loader />;
  if (!authenticated) return <Redirect href="/(public)/login" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
