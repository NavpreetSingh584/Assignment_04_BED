import admin from "firebase-admin";
import path from "path";
import fs from "fs";

let serviceAccountPath = path.resolve("serviceKey.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.warn(
    "serviceKey.json not found — using dummy Firebase credentials (tests or CI)"
  );
  admin.initializeApp();
} else {
  // Only runs in dev, when the key exists
  const serviceAccount = require(serviceAccountPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const auth = admin.auth();
export const db = admin.firestore();