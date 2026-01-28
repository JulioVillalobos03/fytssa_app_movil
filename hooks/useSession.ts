import { useEffect, useState } from "react";
import { getToken, getUser } from "../services/storage.service";


type SessionUser = {
  id: number;
  name: string;
  email: string;
  company?: {
    code: string;
    name: string;
    primary_color: string;
  };
};

export function useSession() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        const storedUser = await getUser();

        if (token && storedUser) {
          setAuthenticated(true);
          setUser(storedUser);
        } else {
          setAuthenticated(false);
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    loading,
    authenticated,
    user,
  };
}