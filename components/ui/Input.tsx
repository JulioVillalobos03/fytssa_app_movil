import { TextInput, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { base } from "../../constants/theme";

export function Input(props: any) {
  const theme = useTheme();

  return (
    <TextInput
      placeholderTextColor={theme.textSecondary}
      style={[
        styles.input,
        {
          backgroundColor: theme.surface,
          color: theme.text,
          borderColor: theme.border,
        },
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: base.radius.md,
    paddingHorizontal: base.spacing.md,
    paddingVertical: 14,
    marginBottom: base.spacing.md,
  },
});
