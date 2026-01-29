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

  FIELDS_REQUIRED: {
    es: "Todos los campos son obligatorios",
    en: "All fields are required",
  },

  PASSWORD_TOO_SHORT: {
    es: "La contraseña debe tener al menos 6 caracteres",
    en: "Password must be at least 6 characters",
  },

  PASSWORD_MISMATCH: {
    es: "Las contraseñas no coinciden",
    en: "Passwords do not match",
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
