import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Screen } from "../../components/layout/Screen";
import { useTheme } from "../../hooks/useTheme";
import { base } from "../../constants/theme";
import { setCompanySelection } from "../../services/storage.service";
import { router } from "expo-router";
import { API_BASE_URL } from "../../constants/api";
import { Loader } from "../../components/ui/Loader";
import { Ionicons } from "@expo/vector-icons";
import { useT } from "../../hooks/useT";
import { ErrorMessage } from "../../components/ui/ErrorMessage";

type Company = {
  id: number;
  code: string;
  name: string;
  primary_color: string;
};

function getCompanyIcon(index: number) {
  const icons: (keyof typeof Ionicons.glyphMap)[] = [
    "business-outline",
    "settings-outline",
    "bar-chart-outline",
    "rocket-outline",
  ];
  return icons[index % icons.length];
}

export default function SelectCompany() {
  const theme = useTheme();
  const t = useT();

  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/companies`);

      if (!res.ok) {
        throw new Error("REQUEST_FAILED");
      }

      const json = await res.json();
      setCompanies(json?.data ?? []);
    } catch {
      setError("COMPANY_LOAD_ERROR");
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }

  async function onSelect(code: string, color: string) {
    if (!code) return;

    await setCompanySelection(code, color);
    router.replace("/(public)/login");
  }

  if (loading) return <Loader />;

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>
          {t("company.chooseTitle")}
        </Text>

        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {t("company.chooseSubtitle")}
        </Text>

        <ErrorMessage
          text={
            error
              ? t("company.loadError") ?? t("company.loadError")
              : null
          }
        />

        {!error && companies.length === 0 && (
          <Text
            style={[
              styles.empty,
              { color: theme.textSecondary },
            ]}
          >
            {t("company.noCompanies") ?? t("company.noCompanies")}
          </Text>
        )}

        <View style={styles.list}>
          {companies.map((c, index) => (
            <Pressable
              key={c.id}
              onPress={() => onSelect(c.code, c.primary_color)}
              style={({ pressed }) => [
                styles.card,
                {
                  borderColor: c.primary_color,
                  backgroundColor: pressed
                    ? c.primary_color
                    : theme.surface,
                  transform: [{ scale: pressed ? 0.96 : 1 }],
                },
              ]}
            >
              {({ pressed }) => {
                const active = pressed;
                const iconColor = active ? "#FFFFFF" : c.primary_color;
                const textColor = active ? "#FFFFFF" : theme.text;

                return (
                  <>
                    <View
                      style={[
                        styles.iconWrapper,
                        {
                          borderColor: active
                            ? "#FFFFFF"
                            : c.primary_color,
                          backgroundColor: active
                            ? "rgba(255,255,255,0.15)"
                            : "transparent",
                        },
                      ]}
                    >
                      <Ionicons
                        name={getCompanyIcon(index)}
                        size={26}
                        color={iconColor}
                      />
                    </View>

                    <Text
                      style={[
                        styles.companyName,
                        { color: textColor },
                      ]}
                    >
                      {c.name}
                    </Text>
                  </>
                );
              }}
            </Pressable>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: base.spacing.xs,
  },

  title: {
    fontSize: base.font.title,
    fontWeight: "900",
    textAlign: "center",
    textTransform: "uppercase",
  },

  subtitle: {
    marginTop: base.spacing.sm,
    fontSize: base.font.subtitle,
    textAlign: "center",
  },

  empty: {
    marginTop: base.spacing.lg,
    textAlign: "center",
    fontSize: 14,
  },

  list: {
    marginTop: base.spacing.xl,
  },

  card: {
    borderWidth: 1.5,
    borderRadius: base.radius.lg,
    paddingVertical: base.spacing.xl,
    paddingHorizontal: base.spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: base.spacing.lg,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 8,
  },

  iconWrapper: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: base.spacing.lg,
  },

  companyName: {
    fontSize: 18,
    fontWeight: "800",
    textTransform: "uppercase",
  },
});
