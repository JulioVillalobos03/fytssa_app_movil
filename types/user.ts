import type { Company } from "./company";

export type User = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  company?: Company;
};