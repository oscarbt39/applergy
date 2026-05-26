# 🍎 Applergy - Smart Allergen Management

**Applergy** is a cross-platform ecosystem designed to streamline inventory management and food safety. This project was my Capstone Project (TFG) for the Higher Degree in Multiplatform Applications Development (DAM), where I integrated native mobile development with a dynamic web administration interface.

---

## 🚀 Project Architecture

The system is split into two main blocks connected through **Firebase**:

1.  **Mobile App (Kotlin):** A native application for the end-user, enabling real-time product and allergen queries and management.
2.  **Administration Panel (Angular):** A web dashboard for bulk inventory management, including creations, updates, and deletions (CRUD).

## 🛠️ Technological Stack

* **Mobile:** Kotlin (Android SDK), Material Design.
* **Web:** Angular 18+, TypeScript.
* **Backend as a Service (BaaS):**
    * **Firestore:** Real-time NoSQL database.
    * **Firebase Auth:** Secure user management.
* **Version Control:** Git & GitHub.

## 📦 Key Features

* ✅ **Full Synchronization:** Changes made in the web panel are instantly reflected in the mobile app.
* ✅ **CRUD Management:** Complete control over the product catalog and its specific allergen details.
* ✅ **Security:** Restricted access managed via Firebase Authentication.

---

## ⚙️ Installation and Setup

> **Security Note:** Firebase configuration files (`google-services.json` and `app.config.ts`) have been replaced with example placeholders for security reasons.

To run the project locally:
1. Clone the repository.
2. Create a project in the Firebase Console.
3. Replace the placeholder values in `src/app/app.config.ts` and add your `google-services.json` into the Android `/app` folder.
4. Run `npm install` in the web directory and sync Gradle in the mobile directory.

---
## Screenshots

<img width="473" height="432" alt="imagen" src="https://github.com/user-attachments/assets/b750d2af-c70d-4ee7-99a6-70f0ebbe6e98" />

<img width="477" height="364" alt="imagen" src="https://github.com/user-attachments/assets/b12c5d63-8397-43ac-a519-6d610925b444" />

<img width="1363" height="604" alt="imagen" src="https://github.com/user-attachments/assets/ed28cca6-5fef-4ad0-9753-5cf8625f149d" />

<img width="549" height="367" alt="imagen" src="https://github.com/user-attachments/assets/638a099d-6faa-423b-aa45-3db2c268ce20" />

<img width="414" height="360" alt="imagen" src="https://github.com/user-attachments/assets/470ae379-e8a8-4d6a-9b52-5eef5ab6d51c" />

<img width="324" height="254" alt="imagen" src="https://github.com/user-attachments/assets/49160457-3220-4dbc-8f32-c4b3599fb301" />

<img width="717" height="258" alt="imagen" src="https://github.com/user-attachments/assets/608ecd6c-efd3-498a-8cae-f141389492ba" />

<img width="655" height="287" alt="imagen" src="https://github.com/user-attachments/assets/4ba6b351-2adc-4df7-bef1-c9454b8dd61a" />

---

## 👨‍💻 About Me
Recently graduated in **Multiplatform Applications Development (DAM)** and currently pursuing a **Master's Degree in Game Development and Virtual Reality**. Passionate about building technological solutions that solve real-world problems.
