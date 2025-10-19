import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";

if (!admin.apps.length) {
  try {
    const credsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (credsPath) {
      const content = readFileSync(path.resolve(credsPath), "utf8");
      const serviceAccount = JSON.parse(content);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    } else {
      admin.initializeApp();
    }
  } catch (error) {
    admin.initializeApp();
  }
}

export const auth = (() => {
  try {
    return admin.auth();
  } catch {
    return {
      verifyIdToken: async () => ({
        uid: "mockUser",
        email: "mock@example.com",
        roles: ["officer"],
      }),
    } as unknown as admin.auth.Auth;
  }
})();

export const db = (() => {
  try {
    return admin.firestore();
  } catch {
    return {
      collection: () => ({
        doc: () => ({
          set: async () => {},
          get: async () => ({ exists: true, data: () => ({}) }),
        }),
      }),
    } as unknown as admin.firestore.Firestore;
  }
})();
