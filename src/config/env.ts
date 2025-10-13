import 'dotenv/config';

export const env = {
  PORT: process.env.PORT ?? '8080',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ?? 'Assignment-4-BED',
 
  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS ?? './serviceKey.json'
};
