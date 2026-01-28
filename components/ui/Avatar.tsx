import { Image, View, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";

export function Avatar({ uri, size = 64 }: { uri?: string | null; size?: number }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.border,
        },
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
});
