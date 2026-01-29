import { View, Text, StyleSheet } from "react-native";
import { Screen } from "../../../components/layout/Screen";
import { useTheme } from "../../../hooks/useTheme";
import { base } from "../../../constants/theme";
import { AppHeader } from "@/components/layout/AppHeader";
import { useT } from "@/hooks/useT";

export default function Home() {
  const theme = useTheme();
  const t = useT();

  return (
    <Screen>
      <AppHeader />

      <View style={styles.container}>
        {/* Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              shadowColor: theme.shadow,
            },
          ]}
        >
          <Text style={[styles.title, { color: theme.text }]}>
            {t("home.welcome")}{" "}
            👋
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: theme.textSecondary },
            ]}
          >
            {t("home.subtitle")}
          </Text>

          <View
            style={[
              styles.divider,
              { backgroundColor: theme.border },
            ]}
          />

          <Text
            style={[
              styles.info,
              { color: theme.textSecondary },
            ]}
          >
            {t("home.description")}
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: base.spacing.xs,
  },

  card: {
    width: "100%",
    marginTop: base.spacing.lg,
    padding: base.spacing.lg,
    paddingVertical: base.spacing.xl,
    borderRadius: base.radius.lg,
    borderWidth: 1,

    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },

  title: {
    fontSize: base.font.title,
    fontWeight: "900",
    textAlign: "center",
  },

  subtitle: {
    marginTop: base.spacing.xs,
    fontSize: base.font.body,
    textAlign: "center",
  },

  divider: {
    height: 1,
    marginVertical: base.spacing.md,
  },

  info: {
    fontSize: base.font.small,
    lineHeight: 20,
    textAlign: "center",
  },
});
