import { db } from "@/lib/firebase";
import { User } from "@/types";
import { doc, getDoc } from "firebase/firestore";

export const getUserById = async (uid: string) => {
    const docRef = doc(db, "users", uid);

    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
        return docSnapshot.data() as User;
    }

    return null;
};
