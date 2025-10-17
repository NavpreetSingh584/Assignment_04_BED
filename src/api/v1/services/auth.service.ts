// Internal Imports

import { getFirebase } from "./firebase";

// Auth Service Functions

/**
 * Verifies a Firebase ID token.
 * @param idToken - The ID token to verify
 */
export const verifyIdToken = async (idToken: string) => {
    const admin = getFirebase();
    return admin.auth().verifyIdToken(idToken);
};

/**
 * Sets custom user claims (roles or permissions) for a user.
 * @param uid - Firebase user UID
 * @param claims - Custom claims object
 */
export const setCustomUserClaims = async (
    uid: string,
    claims: Record<string, unknown>
) => {
    const admin = getFirebase();
    await admin.auth().setCustomUserClaims(uid, claims);
    return { uid, claims };
};

/**
 * Retrieves user details by UID from Firebase Authentication.
 * @param uid - Firebase user UID
 */
export const getUserById = async (uid: string) => {
    const admin = getFirebase();
    return admin.auth().getUser(uid);
};
