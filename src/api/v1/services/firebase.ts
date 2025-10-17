import admin from "firebase-admin";

let initialized = false;

export const getFirebase = () => {
  if (!initialized) {
    if (process.env.FIREBASE_PRIVATE_KEY) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        } as admin.ServiceAccount)
      });
    } else {
      // Dev-only fallback (uncomment if using local file)
      // const svc = require("../../serviceAccount.json");
      // admin.initializeApp({ credential: admin.credential.cert(svc) });
      throw new Error("Firebase credentials not provided");
    }
    initialized = true;
  }
  return admin;
};
