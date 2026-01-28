import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { base } from "../../constants/theme";

type Props = {
  title: string;
  onPress: () => void;
};

export function OutlineButton({ title, onPress }: Props) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          borderColor: theme.border,
          backgroundColor: theme.button,
        },
      ]}
    >
      <Text style={[styles.text, { color: theme.text }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderWidth: 1,
    borderRadius: base.radius.md,
    paddingVertical: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
