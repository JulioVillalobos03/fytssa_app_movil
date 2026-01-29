import { Text, StyleSheet, Alert, View, Pressable } from "react-native";
import { Screen } from "../../../components/layout/Screen";
import { Button } from "../../../components/ui/Button";
import { Loader } from "../../../components/ui/Loader";
import { useTheme } from "../../../hooks/useTheme";
import { base } from "../../../constants/theme";
import { logout } from "../../../services/auth.service";
import { router } from "expo-router";
import { AppHeader } from "@/components/layout/AppHeader";
import { useT } from "@/hooks/useT";
import { useLanguage } from "@/hooks/LanguageContext";
import { useState } from "react";

export default function Settings() {
  const theme = useTheme();
  const t = useT();
  const { lang, changeLanguage } = useLanguage();

  const [changingLang, setChangingLang] = useState(false);

  async function handleChangeLanguage(code: "es" | "en") {
    if (code === lang) return;

    setChangingLang(true);

    setTimeout(() => {
      changeLanguage(code);
      setChangingLang(false);
    }, 250);
  }

  function onLogout() {
    Alert.alert(
      t("settings.logoutTitle"),
      t("settings.logoutConfirm"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.logout"),
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace("/(public)/login");
          },
        },
      ]
    );
  }

  return (
    <Screen>
      <AppHeader />

      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>
          {t("settings.title")}
        </Text>

        {/* Language */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            {t("settings.language")}
          </Text>

          <View style={styles.langRow}>
            {[
              { code: "es", label: "Español 🇲🇽" },
              { code: "en", label: "English 🇺🇸" },
            ].map((l) => {
              const active = lang === l.code;

              return (
                <Pressable
                  key={l.code}
                  onPress={() => handleChangeLanguage(l.code as "es" | "en")}
                  disabled={changingLang}
                  style={[
                    styles.langButton,
                    {
                      borderColor: active ? theme.text : theme.border,
                      backgroundColor: active
                        ? theme.surface
                        : "transparent",
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: active
                        ? theme.text
                        : theme.textSecondary,
                      fontWeight: active ? "800" : "600",
                    }}
                  >
                    {l.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Logout */}
        <View style={styles.logout}>
          <Button title={t("common.logout")} onPress={onLogout} />
        </View>
      </View>

      {changingLang && <Loader overlay />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: base.spacing.lg,
    paddingVertical: base.spacing.xl,
    gap: base.spacing.xl,
  },

  title: {
    fontSize: base.font.title,
    fontWeight: "900",
    textTransform: "uppercase",
  },

  section: {
    width: "100%",
    gap: base.spacing.sm,
  },

  sectionTitle: {
    fontSize: base.font.small,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontWeight: "700",
  },

  langRow: {
    flexDirection: "row",
    gap: base.spacing.sm,
  },

  langButton: {
    flex: 1,
    paddingVertical: base.spacing.sm,
    borderWidth: 1,
    borderRadius: base.radius.md,
    alignItems: "center",
  },

  logout: {
    width: "100%",
    marginTop: base.spacing.xl,
  },
});
