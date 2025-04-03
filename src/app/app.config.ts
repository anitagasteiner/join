import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({ projectId: "join-6c46d", appId: "1:665851837305:web:04ecc75f880c8b17330da8", storageBucket: "join-6c46d.firebasestorage.app", apiKey: "AIzaSyAt1u3Oy20EOsRnyhXaYK33Rjade-Jzwbc", authDomain: "join-6c46d.firebaseapp.com", messagingSenderId: "665851837305" })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
