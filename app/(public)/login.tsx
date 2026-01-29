import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../components/layout/Screen";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { useTheme } from "../../hooks/useTheme";
import { base } from "../../constants/theme";
import { getCompanySelection } from "../../services/storage.service";
import { login } from "../../services/auth.service";
import { router } from "expo-router";
import { useApiError } from "../../hooks/useApiError";
import { useT } from "../../hooks/useT";

export default function Login() {
  const theme = useTheme();
  const t = useT();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [companyCode, setCompanyCode] = useState("");
  const [companyColor, setCompanyColor] = useState("#4F46E5");
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<string | undefined>();

  const errorMessage = useApiError(errorCode);

  useEffect(() => {
    (async () => {
      const sel = await getCompanySelection();
      if (!sel?.code) {
        router.replace("/(public)/select-company");
        return;
      }
      setCompanyCode(sel.code);
      setCompanyColor(sel.color || "#4F46E5");
    })();
  }, []);

  function validateForm() {
    if (!email || !password) {
      setErrorCode("FIELDS_REQUIRED");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorCode("INVALID_EMAIL");
      return false;
    }

    return true;
  }

  async function onSubmit() {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setErrorCode(undefined);

      await login({
        company_code: companyCode,
        email,
        password,
      });

      router.replace("/(protected)/(tabs)/home");
    } catch (e: any) {
      setErrorCode(e?.code || "UNKNOWN_ERROR");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <View style={[styles.container, { backgroundColor: companyColor }]}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              shadowColor: theme.shadow,
            },
          ]}
        >
          <Pressable
            style={styles.backButton}
            onPress={() => router.replace("/(public)/select-company")}
          >
            <Text style={[styles.backIcon, { color: theme.textSecondary }]}>
              ←
            </Text>
          </Pressable>

          {/* Content */}
          <View style={styles.content}>
            <Text style={[styles.title, { color: theme.text }]}>
              {t("auth.welcomeBack")}
            </Text>

            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {t("auth.signInToContinue")}
            </Text>

            <View style={styles.form}>
              <Input
                placeholder={t("auth.email")}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={(v: string) => {
                  setEmail(v);
                  setErrorCode(undefined);
                }}
              />

              <View style={styles.inputWrapper}>
                <Input
                  placeholder={t("auth.password")}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(v: string) => {
                    setPassword(v);
                    setErrorCode(undefined);
                  }}
                />
                <Pressable
                  style={styles.eyeButton}
                  onPress={() => setShowPassword((p) => !p)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    color={theme.textSecondary}
                  />
                </Pressable>
              </View>

              <ErrorMessage text={errorMessage} />

              <Button
                title={loading ? t("common.loading") : t("auth.login")}
                onPress={onSubmit}
                color={companyColor}
                disabled={loading}
              />
            </View>

            <Pressable onPress={() => router.push("/(public)/register")}>
              <Text style={[styles.link, { color: theme.textSecondary }]}>
                {t("auth.dontHaveAccount")}{" "}
                <Text style={{ color: companyColor, fontWeight: "800" }}>
                  {t("auth.register")}
                </Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: base.spacing.xs,
  },

  card: {
    width: "100%",
    height: "60%",
    padding: base.spacing.lg,
    borderRadius: base.radius.lg,
    borderWidth: 1,
    position: "relative",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },

  backButton: {
    position: "absolute",
    top: base.spacing.lg,
    left: base.spacing.lg,
    zIndex: 10,
  },

  backIcon: {
    fontSize: 28,
    fontWeight: "800",
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: base.font.title,
    fontWeight: "900",
    textAlign: "center",
  },

  subtitle: {
    marginTop: base.spacing.xs,
    fontSize: base.font.subtitle,
    textAlign: "center",
  },

  form: {
    marginTop: base.spacing.lg,
    gap: base.spacing.sm,
  },

  link: {
    marginTop: base.spacing.lg,
    fontSize: 13,
    textAlign: "center",
  },

  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },

  eyeButton: {
    position: "absolute",
    right: 14,
    bottom: 8,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
