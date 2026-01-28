import { ReactNode } from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../hooks/useTheme";

export function Screen({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
