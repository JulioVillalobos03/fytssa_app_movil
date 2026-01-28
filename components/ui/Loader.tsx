import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";

export function Loader() {
  const theme = useTheme();
  return (
    <View style={styles.wrap}>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 12,
  },
});
