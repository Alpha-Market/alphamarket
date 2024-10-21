// firebaseAdmin.ts
import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.json";

// Initialize the Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as any),
    });
}

export default admin;