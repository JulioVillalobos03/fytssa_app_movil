import { ReactNode } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/useTheme";

interface ScreenProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function Screen({ children, style }: ScreenProps) {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
        style,
      ]}
      edges={["top", "bottom"]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
