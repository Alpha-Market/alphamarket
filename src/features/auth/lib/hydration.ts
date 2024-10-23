import { db } from "@/lib/firebase";
import { useUserStore } from "@/store/user.store";
import { User } from "@/types";
import { User as FirebaseAuthUser } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const hydrateNewUser = async (authUser: FirebaseAuthUser) => {
    const newUser: User = {
        id: authUser.uid,
        email: authUser.email || "",
        isNewUser: true,
        role: "",
        bio: "",
        categories: [],
        network: "" as any,
        pfp_url: "",
        group: null,
        campaigns: [],
    };

    await setDoc(doc(db, "users", authUser.uid), newUser);
    useUserStore.setState({ user: newUser });
};

export const hydrateOldUser = async (authUser: FirebaseAuthUser) => {
    const docSnap = await getDoc(doc(db, "users", authUser.uid));

    if (docSnap.exists()) {
        const _u = docSnap.data();
        useUserStore.setState({ user: _u as User });
    } else {
        useUserStore.setState({
            user: {
                id: authUser.uid,
                email: authUser.email as string,
                isNewUser: true,
                role: "",
                pfp_url: "",
                bio: "",
                categories: [],
                network: "" as any,
                group: null,
                campaigns: [],
            },
        });
    }
};

export const hydrateTwitterUser = async (authUser: FirebaseAuthUser) => {
    const docSnap = await getDoc(doc(db, "users", authUser.uid));

    if (docSnap.exists()) {
        const _u = docSnap.data();
        useUserStore.setState({ user: _u as User });
    } else {
        const newUser: User = {
            id: authUser.uid,
            displayName: authUser.displayName as string,
            twitterHandle: (authUser as any)?.reloadUserInfo?.screenName,
            email: authUser.email as string,
            isNewUser: true,
            role: "",
            pfp_url: "",
            photoURL: authUser.photoURL as string,
            bio: "",
            categories: [],
            network: "" as any,
            group: null,
            campaigns: [],
        };

        await setDoc(doc(db, "users", authUser.uid), newUser);

        useUserStore.setState({
            user: newUser,
        });
    }
};
