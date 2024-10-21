import admin from "@/lib/firebaseAdmin";
import { User } from "@/types";
import { headers } from "next/headers";

export async function isNewUserAction() {
    const userId = headers().get("x-user-id");

    if (!userId) return false;

    const userDoc = await admin
        .firestore()
        .collection("users")
        .doc(userId)
        .get();

    if (!userDoc.exists) return false;

    const currentUser = userDoc.data() as User;
    return currentUser["isNewUser"];
}
