import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";

export function Loader({ overlay = false }: { overlay?: boolean }) {
  const theme = useTheme();

  if (overlay) {
    return (
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={theme.textSecondary} />
      </View>
    );
  }

  return (
    <View style={styles.inline}>
      <ActivityIndicator color={theme.textSecondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  inline: {
    paddingVertical: 12,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
});
