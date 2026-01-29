export const translations = {
  en: {
    home: {
      welcome: "Welcome",
      subtitle: "You are logged in successfully",
      description:
        "This app is connected to a real backend API with authentication, profile management and secure sessions.",
    },

    common: {
      save: "Save",
      saving: "Saving...",
      cancel: "Cancel",
      loading: "Loading...",
      confirm: "Confirm",
      logout: "Logout",
      fieldsRequired: "All fields are required",
      passwordTooShort: "Password must be at least 6 characters",
      passwordMismatch: "Passwords do not match",
    },

    auth: {
      welcomeBack: "Welcome back",
      signInToContinue: "Sign in to continue",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      login: "Login",
      register: "Register",
      dontHaveAccount: "Don’t have an account?",
      alreadyHaveAccount: "Already have an account?",
    },

    company: {
      chooseTitle: "Choose your company",
      chooseSubtitle: "This will personalize your experience",
      code: "Code",
      noCompanies: "No companies available",
      loadError: "Error loading companies",
    },

    profile: {
      title: "Profile",
      edit: "Edit profile",
      editTitle: "Edit profile",
      editPhoto: "Edit photo or avatar",

      name: "Name",
      email: "Email",

      confirmTitle: "Save changes",
      confirmMessage: "Do you want to update your profile?",
    },

    settings: {
      title: "Settings",
      language: "Language",
      logout: "Logout",
      logoutTitle: "Log out",
      logoutConfirm: "Are you sure?",
    },
  },

  es: {
    home: {
      welcome: "Bienvenido",
      subtitle: "Has iniciado sesión correctamente",
      description:
        "Esta aplicación está conectada a un backend real con autenticación, gestión de perfil y sesiones seguras.",
    },

    common: {
      save: "Guardar",
      saving: "Guardando...",
      cancel: "Cancelar",
      loading: "Cargando...",
      confirm: "Confirmar",
      logout: "Cerrar sesión",
      fieldsRequired: "Todos los campos son obligatorios",
      passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
      passwordMismatch: "Las contraseñas no coinciden",
    },

    auth: {
      welcomeBack: "Bienvenido de nuevo",
      signInToContinue: "Inicia sesión para continuar",
      email: "Correo",
      password: "Contraseña",
      confirmPassword: "Confirmar contraseña",
      login: "Iniciar sesión",
      register: "Registrarse",
      dontHaveAccount: "¿No tienes cuenta?",
      alreadyHaveAccount: "¿Ya tienes cuenta?",
    },

    company: {
      chooseTitle: "Elige tu empresa",
      chooseSubtitle: "Esto personalizará tu experiencia",
      code: "Código",
      noCompanies: "No hay empresas disponibles",
      loadError: "Error cargando empresas",
    },

    profile: {
      title: "Perfil",
      edit: "Editar perfil",
      editTitle: "Editar perfil",
      editPhoto: "Editar foto o avatar",

      name: "Nombre",
      email: "Email",

      confirmTitle: "Guardar cambios",
      confirmMessage: "¿Deseas actualizar tu perfil?",
    },

    settings: {
      title: "Ajustes",
      language: "Idioma",
      logout: "Cerrar sesión",
      logoutTitle: "Cerrar sesión",
      logoutConfirm: "¿Estás seguro?",
    },
  },
} as const;
