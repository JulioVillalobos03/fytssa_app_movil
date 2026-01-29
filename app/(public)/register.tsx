import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../components/layout/Screen";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { useTheme } from "../../hooks/useTheme";
import { base } from "../../constants/theme";
import { getCompanySelection } from "../../services/storage.service";
import { register } from "../../services/auth.service";
import { router } from "expo-router";
import { useApiError } from "../../hooks/useApiError";
import { useT } from "../../hooks/useT";

export default function Register() {
  const theme = useTheme();
  const t = useT();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setErrorCode("FIELDS_REQUIRED");
      return false;
    }

    if (form.password.length < 6) {
      setErrorCode("PASSWORD_TOO_SHORT");
      return false;
    }

    if (form.password !== form.confirm) {
      setErrorCode("PASSWORD_MISMATCH");
      return false;
    }

    return true;
  }

  async function onSubmit() {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setErrorCode(undefined);

      await register({
        company_code: companyCode,
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirm,
      });

      router.replace("/(public)/login");
    } catch (e: any) {
      setErrorCode(e?.code || "UNKNOWN_ERROR");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
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
              {/* Back */}
              <Pressable
                style={styles.backButton}
                onPress={() => router.replace("/(public)/login")}
              >
                <Text style={[styles.backIcon, { color: theme.textSecondary }]}>
                  ←
                </Text>
              </Pressable>

              {/* Content */}
              <View style={styles.content}>
                <Text style={[styles.title, { color: theme.text }]}>
                  {t("auth.register")}
                </Text>

                <Text
                  style={[styles.subtitle, { color: theme.textSecondary }]}
                >
                  {t("auth.signInToContinue")}
                </Text>

                <View style={styles.form}>
                  <Input
                    placeholder={t("profile.name")}
                    value={form.name}
                    onChangeText={(v: string) =>
                      setForm((p) => ({ ...p, name: v }))
                    }
                  />

                  <Input
                    placeholder={t("auth.email")}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={form.email}
                    onChangeText={(v: string) =>
                      setForm((p) => ({ ...p, email: v }))
                    }
                  />

                  {/* Password */}
                  <View style={styles.inputWrapper}>
                    <Input
                      placeholder={t("auth.password")}
                      secureTextEntry={!showPassword}
                      value={form.password}
                      onChangeText={(v: string) =>
                        setForm((p) => ({ ...p, password: v }))
                      }
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

                  {/* Confirm */}
                  <View style={styles.inputWrapper}>
                    <Input
                      placeholder={t("auth.confirmPassword")}
                      secureTextEntry={!showConfirm}
                      value={form.confirm}
                      onChangeText={(v: string) =>
                        setForm((p) => ({ ...p, confirm: v }))
                      }
                    />
                    <Pressable
                      style={styles.eyeButton}
                      onPress={() => setShowConfirm((p) => !p)}
                    >
                      <Ionicons
                        name={showConfirm ? "eye-off" : "eye"}
                        size={22}
                        color={theme.textSecondary}
                      />
                    </Pressable>
                  </View>

                  <ErrorMessage text={errorMessage} />

                  <Button
                    title={
                      loading ? t("common.loading") : t("auth.register")
                    }
                    onPress={onSubmit}
                    color={companyColor}
                    disabled={loading}
                  />
                </View>

                <Pressable
                  onPress={() => router.replace("/(public)/login")}
                >
                  <Text
                    style={[styles.link, { color: theme.textSecondary }]}
                  >
                    {t("auth.alreadyHaveAccount")}{" "}
                    <Text
                      style={{
                        color: companyColor,
                        fontWeight: "800",
                      }}
                    >
                      {t("auth.login")}
                    </Text>
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    minHeight: "65%",
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
    right: 16,
    bottom: 8,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
