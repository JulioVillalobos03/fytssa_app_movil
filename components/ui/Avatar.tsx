import { Image, StyleSheet, View } from "react-native";
import { API_BASE_URL } from "../../constants/api";
import { useTheme } from "../../hooks/useTheme";

type Props = {
  uri?: string | null;
  size?: number;
};

export function Avatar({ uri, size = 64 }: Props) {
  const theme = useTheme();

  const baseUrl = API_BASE_URL.replace(/\/api\/?$/, "");

  const finalUri =
    uri && (uri.startsWith("http://") || uri.startsWith("https://"))
      ? uri
      : uri && (uri.startsWith("file://") || uri.startsWith("content://"))
      ? uri 
      : uri
      ? uri.startsWith("/")
        ? `${baseUrl}${uri}`
        : `${baseUrl}/${uri}`
      : null;

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
      {finalUri ? (
        <Image
          key={finalUri} 
          source={{ uri: finalUri }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
          resizeMode="cover"
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
