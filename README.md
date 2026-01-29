# 🍎 Applergy - Gestión Inteligente de Alérgenos

**Applergy** es un ecosistema multiplataforma diseñado para facilitar la gestión de inventario y la seguridad alimentaria. Este proyecto fue mi Trabajo de Fin de Grado (TFG) en el CFGS de DAM, donde integré el desarrollo móvil nativo con una interfaz administrativa web dinámica.

---

## 🚀 Arquitectura del Proyecto

El sistema se divide en dos grandes bloques conectados a través de **Firebase**:

1.  **App Móvil (Kotlin):** Aplicación nativa para el usuario final que permite la consulta y gestión de productos/alérgenos en tiempo real.
2.  **Panel de Administración (Angular):** Dashboard web para la gestión masiva del inventario, altas, bajas y modificaciones (CRUD).

## 🛠️ Stack Tecnológico

* **Mobile:** Kotlin (Android SDK), Material Design.
* **Web:** Angular 18+, TypeScript.
* **Backend as a Service (BaaS):** * **Firestore:** Base de datos NoSQL en tiempo real.
    * **Firebase Auth:** Gestión segura de usuarios.
* **Control de Versiones:** Git & GitHub.

## 📦 Funcionalidades Principales

* ✅ **Sincronización Total:** Los cambios realizados en el panel web se reflejan instantáneamente en la app móvil.
* ✅ **Gestión CRUD:** Control completo sobre el catálogo de productos y sus especificaciones de alérgenos.
* ✅ **Seguridad:** Acceso restringido mediante autenticación de Firebase.

---

## ⚙️ Instalación y Configuración

> **Nota de Seguridad:** Los archivos de configuración de Firebase (`google-services.json` y `app.config.ts`) han sido sustituidos por versiones de ejemplo (*placeholders*) por seguridad. 

Para ejecutar el proyecto localmente:
1. Clona el repositorio.
2. Crea un proyecto en la consola de Firebase.
3. Sustituye los valores en `src/app/app.config.ts` y añade tu `google-services.json` en la carpeta `/app` de Android.
4. Ejecuta `npm install` en la parte web y sincroniza Gradle en la parte móvil.

---
## Algunas capturas

<img width="473" height="432" alt="imagen" src="https://github.com/user-attachments/assets/b750d2af-c70d-4ee7-99a6-70f0ebbe6e98" />

<img width="477" height="364" alt="imagen" src="https://github.com/user-attachments/assets/b12c5d63-8397-43ac-a519-6d610925b444" />

<img width="1363" height="604" alt="imagen" src="https://github.com/user-attachments/assets/ed28cca6-5fef-4ad0-9753-5cf8625f149d" />

<img width="549" height="367" alt="imagen" src="https://github.com/user-attachments/assets/638a099d-6faa-423b-aa45-3db2c268ce20" />

<img width="414" height="360" alt="imagen" src="https://github.com/user-attachments/assets/470ae379-e8a8-4d6a-9b52-5eef5ab6d51c" />

<img width="324" height="254" alt="imagen" src="https://github.com/user-attachments/assets/49160457-3220-4dbc-8f32-c4b3599fb301" />

<img width="717" height="258" alt="imagen" src="https://github.com/user-attachments/assets/608ecd6c-efd3-498a-8cae-f141389492ba" />

<img width="655" height="287" alt="imagen" src="https://github.com/user-attachments/assets/4ba6b351-2adc-4df7-bef1-c9454b8dd61a" />

---

## 👨‍💻 Sobre mí
Recién graduado en **DAM** y actualmente cursando el **Máster de FP en Desarrollo de Videojuegos y Realidad Virtual**. Apasionado por crear soluciones tecnológicas que resuelvan problemas reales.

[Mi Portfolio en Itch.io (Próximamente)] 
