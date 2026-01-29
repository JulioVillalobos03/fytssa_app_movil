import { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { useApiError } from "@/hooks/useApiError";
import { getProfile, updateProfile } from "@/services/profile.service";
import { Loader } from "@/components/ui/Loader";
import { Screen } from "@/components/layout/Screen";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { base } from "@/constants/theme";
import { useT } from "@/hooks/useT";
import type { ProfileData } from "@/types/profile";


export default function EditProfile() {
  const theme = useTheme();
  const t = useT();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorCode, setErrorCode] = useState<string | undefined>();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    avatar: null as string | null,
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const errorMessage = useApiError(errorCode);

  const accentColor =
    profile?.company?.primary_color ?? theme.text;

  useEffect(() => {
    (async () => {
      try {
        const data = await getProfile();

        if (!data) {
          setErrorCode("PROFILE_NOT_FOUND");
          return;
        }

        setProfile(data);
        setForm({
          name: data.name ?? "",
          email: data.email ?? "",
          avatar: data.avatar ?? null,
        });
      } catch {
        setErrorCode("UNKNOWN_ERROR");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function pickAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setAvatarPreview(result.assets[0].uri);
    }
  }

  function confirmSave() {
    if (!form.name || !form.email) {
      setErrorCode("FIELDS_REQUIRED");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      setErrorCode("INVALID_EMAIL");
      return;
    }

    Alert.alert(
      t("profile.confirmTitle"),
      t("profile.confirmMessage"),
      [
        { text: t("common.cancel"), style: "cancel" },
        { text: t("common.save"), onPress: onSave },
      ]
    );
  }

  async function onSave() {
    try {
      setSaving(true);
      setErrorCode(undefined);

      await updateProfile({
        name: form.name,
        email: form.email,
        avatar: avatarPreview,
      });

      router.replace("/(protected)/(tabs)/profile");
    } catch {
      setErrorCode("UNKNOWN_ERROR");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Loader />;

  return (
    <Screen>
      {/* Header */}
      <SafeAreaView
        edges={["top"]}
        style={[
          styles.safeHeader,
          { backgroundColor: theme.background },
        ]}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={[styles.back, { color: theme.text }]}>
              ←
            </Text>
          </Pressable>

          <Text
            style={[
              styles.headerTitle,
              { color: accentColor },
            ]}
          >
            {t("profile.editTitle")}
          </Text>

          <Pressable onPress={confirmSave} disabled={saving}>
            <Text
              style={[
                styles.save,
                {
                  color: saving
                    ? theme.textSecondary
                    : accentColor,
                },
              ]}
            >
              {saving
                ? t("common.saving")
                : t("common.save")}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Content */}
      <View style={styles.container}>
        {/* Avatar */}
        <View style={styles.avatarBlock}>
          <Pressable onPress={pickAvatar}>
            <Avatar
              uri={avatarPreview || form.avatar}
              size={130}
            />
          </Pressable>

          <Pressable onPress={pickAvatar}>
            <Text
              style={[
                styles.editPhoto,
                { color: accentColor },
              ]}
            >
              {t("profile.editPhoto")}
            </Text>
          </Pressable>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View>
            <Text
              style={[
                styles.label,
                { color: theme.text },
              ]}
            >
              {t("profile.name")}
            </Text>
            <Input
              value={form.name}
              onChangeText={(v: string) => {
                setForm((p) => ({ ...p, name: v }));
                setErrorCode(undefined);
              }}
            />
          </View>

          <View>
            <Text
              style={[
                styles.label,
                { color: theme.text },
              ]}
            >
              {t("profile.email")}
            </Text>
            <Input
              value={form.email}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(v: string) => {
                setForm((p) => ({ ...p, email: v }));
                setErrorCode(undefined);
              }}
            />
          </View>
        </View>

        <ErrorMessage text={errorMessage} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  safeHeader: {
    borderBottomWidth: 0.2,
    borderBottomColor: "#ECEDF0",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: base.spacing.lg,
    paddingVertical: base.spacing.xs,
  },

  back: {
    fontSize: 26,
    fontWeight: "700",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
  },

  save: {
    fontSize: 14,
    fontWeight: "800",
  },

  container: {
    paddingHorizontal: base.spacing.lg,
    paddingVertical: 64,
    gap: base.spacing.xl,
  },

  avatarBlock: {
    alignItems: "center",
    gap: base.spacing.sm,
  },

  editPhoto: {
    fontSize: 13,
    fontWeight: "700",
  },

  form: {
    gap: base.spacing.lg,
  },

  label: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
});
