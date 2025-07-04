import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp({ projectId: "join-6c46d", appId: "1:665851837305:web:04ecc75f880c8b17330da8", storageBucket: "join-6c46d.firebasestorage.app", apiKey: environment.googleApiKey, authDomain: "join-6c46d.firebaseapp.com", messagingSenderId: "665851837305" })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
