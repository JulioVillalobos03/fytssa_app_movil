import { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect, router } from "expo-router";

import { Screen } from "../../../components/layout/Screen";
import { Avatar } from "../../../components/ui/Avatar";
import { Loader } from "../../../components/ui/Loader";
import { ErrorMessage } from "../../../components/ui/ErrorMessage";
import { OutlineButton } from "../../../components/ui/OutlineButton";
import { AppHeader } from "@/components/layout/AppHeader";

import { useTheme } from "../../../hooks/useTheme";
import { base } from "../../../constants/theme";
import { getProfile } from "../../../services/profile.service";
import { useApiError } from "../../../hooks/useApiError";
import { useT } from "../../../hooks/useT";
import type { ProfileData } from "../../../types/profile";


export default function Profile() {
  const theme = useTheme();
  const t = useT();

  const [loading, setLoading] = useState(true);
  const [errorCode, setErrorCode] = useState<string | undefined>();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const errorMessage = useApiError(errorCode);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setErrorCode(undefined);

    try {
      const data = await getProfile();

      if (!data) {
        setErrorCode("PROFILE_NOT_FOUND");
        setProfile(null);
        return;
      }

      setProfile(data);
    } catch {
      setErrorCode("UNKNOWN_ERROR");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile])
  );

  return (
    <Screen>
      <AppHeader />

      <View style={styles.container}>
        {profile && (
          <View style={styles.profileRow}>
            <Avatar uri={profile.avatar} size={105} />

            <View style={styles.info}>
              <Text style={[styles.name, { color: theme.text }]}>
                {profile.name}
              </Text>

              <Text style={[styles.email, { color: theme.textSecondary }]}>
                {profile.email}
              </Text>

              {profile.company && (
                <Text
                  style={[
                    styles.company,
                    { color: profile.company.primary_color },
                  ]}
                >
                  {profile.company.name}
                </Text>
              )}
            </View>
          </View>
        )}

        <OutlineButton
          title={t("profile.edit")}
          onPress={() => router.push("/(protected)/profile/edit")}
        />

        <ErrorMessage text={errorMessage} />
      </View>

      {loading && <Loader overlay />}
    </Screen>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: base.spacing.lg,
    paddingVertical: base.spacing.xxl,
    gap: base.spacing.xxl,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: base.spacing.lg,
  },

  info: {
    flex: 1,
    gap: base.spacing.xs,
  },

  name: {
    fontSize: 18,
    fontWeight: "800",
  },

  email: {
    fontSize: base.font.small,
  },

  company: {
    marginTop: base.spacing.xs,
    fontSize: base.font.small,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
});
