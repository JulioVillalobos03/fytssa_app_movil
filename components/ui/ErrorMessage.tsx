import { Text, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { base } from "../../constants/theme";

export function ErrorMessage({ text }: { text?: string | null }) {
  const theme = useTheme();
  if (!text) return null;

  return (
    <Text style={[styles.error, { color: theme.danger }]}>{text}</Text>
  );
}

const styles = StyleSheet.create({
  error: {
    marginTop: base.spacing.sm,
    marginBottom: base.spacing.sm,
    fontSize: base.font.small,
    fontWeight: "600",
  },
});
