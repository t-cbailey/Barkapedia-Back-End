import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../serviceAccount.json';

if (process.env.NODE_ENV !== "production") {
  process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: "https://nc-parks-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.firestore();

export default db;
