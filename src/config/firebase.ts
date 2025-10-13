import admin from 'firebase-admin';
import { env } from './env';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), 
    projectId: env.FIREBASE_PROJECT_ID,
  });
}

export const auth = admin.auth();
export type FirebaseAuth = admin.auth.Auth;
