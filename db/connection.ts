import admin, { ServiceAccount, firestore } from "firebase-admin";
import serviceAccount from "../serviceAccount.json";

if (process.env.NODE_ENV !== "production") {
  process.env.DATABASE_EMULATOR_HOST = "127.0.0.1:9000";
  process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL:
    "https://barkapedia-default-rtdb.europe-west1.firebasedatabase.app",
});

const db: firestore.Firestore = admin.firestore();

export default db;
