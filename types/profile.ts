export type Company = {
  code: string;
  name: string;
  primary_color: string;
};

export type ProfileData = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  company?: Company;
};
