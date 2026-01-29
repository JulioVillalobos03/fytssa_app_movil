import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/useTheme";
import { base } from "../../constants/theme";
import { useSession } from "../../hooks/useSession";

export function AppHeader() {
  const theme = useTheme();
  const { user } = useSession();

  if (!user?.company) return null;

  const companyColor = user.company.primary_color;

  return (
    <SafeAreaView
      edges={["top"]}
      style={[
        styles.safe,
        { backgroundColor: theme.background },
      ]}
    >
      <View
        style={[
          styles.container,
          { borderBottomColor: theme.border },
        ]}
      >
        <View style={styles.row}>
          <View
            style={[
              styles.badge,
              { backgroundColor: companyColor },
            ]}
          />

          <Text
            style={[
              styles.company,
              { color: companyColor },
            ]}
          >
            {user.company.name}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    width: "100%",
  },

  container: {
    width: "100%",
    paddingHorizontal: base.spacing.lg,
    paddingTop: base.spacing.xs,
    paddingBottom: base.spacing.md,
    justifyContent: "center",
    borderBottomWidth: 1,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: base.spacing.sm,
  },

  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  company: {
    fontSize: 14,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
});
