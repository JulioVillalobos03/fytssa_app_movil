import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/useTheme";
import { base } from "../../constants/theme";
import { useSession } from "../../hooks/useSession";

export function AppHeader() {
  const theme = useTheme();
  const { user } = useSession();

  if (!user?.company) return null;

  return (
    <SafeAreaView
      edges={["top"]}
      style={[
        styles.safe,
        { backgroundColor: user.company.primary_color },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            borderBottomColor: theme.border,
          },
        ]}
      >
        <View style={styles.row}>
          <View style={styles.badge} />

          <Text style={[styles.company]}>
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
    paddingVertical: base.spacing.md,
    borderBottomWidth: 1,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: base.spacing.sm,
  },

  badge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },

  company: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
});
