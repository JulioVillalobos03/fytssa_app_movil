# 📱 Prueba Técnica – Aplicación Móvil (React Native + Expo)

Aplicación móvil desarrollada con **React Native** y **Expo** como parte de una prueba técnica para desarrollador móvil. El proyecto se enfoca en la funcionalidad, estructura del código, validaciones y persistencia de datos bajo un escenario **multi-empresa**.

## 🎯 Objetivo

Demostrar la capacidad de diseñar y desarrollar una aplicación móvil funcional, estructurada y usable, priorizando:

* **Correcta implementación técnica:** Código limpio y escalable.
* **Manejo de estado y persistencia:** Gestión eficiente de datos locales.
* **Validaciones y manejo de errores:** Robustez frente a entradas de usuario.
* **Experiencia de usuario (UX):** Interfaz fluida y coherente.

---

## 🚀 Tecnologías Utilizadas

* **Framework:** React Native con Expo
* **Navegación:** Expo Router (File-based routing)
* **Persistencia:** AsyncStorage
* **Lenguaje:** TypeScript
* **Multimedia:** Expo Image Picker
* **Despliegue:** APK generado mediante EAS/Expo

---

## 🧩 Funcionalidades Implementadas

### 1️⃣ Selección de Empresa
* Pantalla inicial para seleccionar la organización.
* **Tematización Dinámica:** Cada empresa tiene un color principal distinto que se refleja en:
    * Header y Tabs.
    * Botones activos y elementos de UI.

### 2️⃣ Inicio de Sesión
* Login independiente por empresa.
* **Validaciones:** Campos obligatorios, formato de email y credenciales.
* **Internacionalización:** Mensajes de error unificados y traducidos (ES / EN).
* **Persistencia:** La sesión se mantiene activa localmente.

### 3️⃣ Navegación (Tabs)
* **Inicio:** Home con bienvenida personalizada.
* **Perfil:** Gestión de datos del usuario.
* **Configuración:** Ajustes de la aplicación.
* Soporte para **Tema Claro / Oscuro**.

### 4️⃣ Perfil de Usuario
* **Visualización:** Nombre, correo, empresa y avatar.
* **Edición:** Cambio de nombre, correo y foto desde la galería del dispositivo.
* **UX:** Vista previa del avatar antes de guardar y manejo de *loaders* sin destellos visuales.

### 5️⃣ Configuración e Idiomas
* **Multilingüe:** Soporte para Español (🇲🇽) e Inglés (🇺🇸).
* Cambio de idioma instantáneo sin recargas bruscas.
* **Cierre de Sesión:** Limpieza total de persistencia y redirección segura.

---

## 💾 Persistencia de Datos

Se utiliza **AsyncStorage** para garantizar que la información no se pierda al cerrar la app:
* Estado de la sesión del usuario.
* Empresa seleccionada y su configuración de color.
* Modificaciones en el perfil (nombre, foto, etc.).

---

## 📁 Estructura del Proyecto

```text
app/
 ├─ (public)        # Rutas de Login / Selección de empresa
 ├─ (protected)     # Rutas protegidas (Tabs)
components/     # UI components reutilizables
hooks/          # Hooks personalizados para lógica compartida
services/       # Lógica de datos y persistencia (Storage)
types/          # Definiciones de TypeScript
constants/      # Temas, colores y diccionarios de texto (i18n)
```


# 📦 Instalación y Ejecución



1. Instalar dependencias

   ```bash
   npm install
   ```

2. Ejecutar la aplicación

   ```bash
   npx expo start
   ```

Puedes abrir la aplicacion en :
* Expo Go
* Emulador Android
* Dispositivo Fisico

## 📲 APK
Se puede descargar el APK funcional desde esta pagina [aquí](https://darkturquoise-ape-711990.hostingersite.com/).

