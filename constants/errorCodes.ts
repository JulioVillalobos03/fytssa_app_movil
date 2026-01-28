export const ERROR_MESSAGES: Record<
  string,
  { es: string; en: string }
> = {
  AUTH_INVALID_CREDENTIALS: {
    es: "Correo o contraseña incorrectos",
    en: "Invalid email or password",
  },
  AUTH_EMAIL_EXISTS: {
    es: "El correo ya está registrado en esta empresa",
    en: "Email already exists for this company",
  },
  VALIDATION_ERROR: {
    es: "Datos inválidos, revisa el formulario",
    en: "Invalid data, check the form",
  },
  UNKNOWN_ERROR: {
    es: "Ocurrió un error inesperado",
    en: "Unexpected error occurred",
  },
};