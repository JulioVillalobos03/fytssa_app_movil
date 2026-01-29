import { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getUser } from "../../../services/storage.service";

export default function TabsLayout() {
  const [activeColor, setActiveColor] = useState("#2563EB"); // fallback

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        if (user?.company?.primary_color) {
          setActiveColor(user.company.primary_color);
        }
      } catch (e) {
        console.warn("[TABS] Could not load company color", e);
      }
    })();
  }, []);

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "profile":
              iconName = focused ? "person" : "person-outline";
              break;
            case "settings":
              iconName = focused ? "settings" : "settings-outline";
              break;
            default:
              iconName = "ellipse";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
