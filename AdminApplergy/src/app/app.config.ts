import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "applergy-341fd", appId: "1:163958055079:web:ae6f0b3197fd19e9117b82", storageBucket: "MiProyectoStorageBucket", apiKey: "MiAPIKey", authDomain: "MiAuthDomain", messagingSenderId: "163958055079" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
