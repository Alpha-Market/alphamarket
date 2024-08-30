import { hydrateOldUser } from "@/actions/User.action";
import { useUserStore } from "@/store/user.store";
import { Auth, onAuthStateChanged, User as FirebaseAuthUser } from "firebase/auth";
import { useState } from "react";

const useAuthState = (auth: Auth) => {
    const [user, setUser] = useState<FirebaseAuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    onAuthStateChanged(auth, async (_user) => {
        if (_user) {
            await hydrateOldUser(_user);
            setUser(_user);
        } else {
            useUserStore.setState({ user: null });
            setUser(null);
        }

        setTimeout(() => {
            setLoading(false);
        }, 800);
    });

    return {
        user,
        loading
    };
};

export default useAuthState;