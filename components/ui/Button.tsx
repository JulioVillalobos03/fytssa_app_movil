import { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { base } from "../../constants/theme";
import { useTheme } from "../../hooks/useTheme";
import { getUser } from "../../services/storage.service";

type Props = {
  title: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
};

export function Button({ title, onPress, color, disabled }: Props) {
  const theme = useTheme();
  const [companyColor, setCompanyColor] = useState<string>("#4F46E5");

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        if (user?.company?.primary_color) {
          setCompanyColor(user.company.primary_color);
        }
      } catch {
        //
      }
    })();
  }, []);

  const finalColor = color ?? companyColor;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        {
          backgroundColor: disabled ? theme.border : finalColor,
          opacity: disabled ? 0.6 : 1,
        },
      ]}
      activeOpacity={0.85}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: base.radius.md,
    paddingVertical: 14,
    paddingHorizontal: 26,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});
